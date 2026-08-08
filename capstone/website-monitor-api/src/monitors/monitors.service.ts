import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { createSign } from 'crypto';
import { Notification, Monitor } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { EmailService } from '../email/email.service';

interface ConditionVerdict {
  met: boolean;
  reasoning: string;
}

@Injectable()
export class MonitorsService {
  private genAI?: GoogleGenerativeAI;
  private readonly modelName: string;
  private readonly vertexProjectId?: string;
  private readonly vertexLocation: string;
  private readonly vertexServiceAccount?: VertexServiceAccount;
  private readonly aiProvider: 'gemini' | 'vertex' | 'mock';
  private vertexAccessToken?: { value: string; expiresAt: number };
  private readonly MAX_CONTENT_LENGTH = 6000;
  private readonly logger = new Logger('MonitorsService');

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private emailService: EmailService,
  ) {
    const apiKey = this.config.get<string>('GEMINI_API_KEY');
    this.vertexProjectId = this.config.get<string>('VERTEX_AI_PROJECT_ID');
    this.vertexLocation =
      this.config.get<string>('VERTEX_AI_LOCATION') ?? 'us-central1';
    this.modelName =
      this.config.get<string>('GEMINI_MODEL') ?? 'gemini-2.5-flash';
    const requestedProvider = this.config.get<string>('AI_PROVIDER');
    if (requestedProvider === 'mock') {
      this.aiProvider = 'mock';
      return;
    }

    const serviceAccountJson = this.config.get<string>(
      'VERTEX_AI_SERVICE_ACCOUNT_JSON',
    );
    if (this.vertexProjectId || serviceAccountJson) {
      if (!this.vertexProjectId || !serviceAccountJson) {
        throw new Error(
          'VERTEX_AI_PROJECT_ID and VERTEX_AI_SERVICE_ACCOUNT_JSON must be configured together',
        );
      }
      try {
        this.vertexServiceAccount = JSON.parse(
          serviceAccountJson,
        ) as VertexServiceAccount;
      } catch {
        throw new Error(
          'VERTEX_AI_SERVICE_ACCOUNT_JSON must contain valid service-account JSON',
        );
      }
      if (
        !this.vertexServiceAccount.client_email ||
        !this.vertexServiceAccount.private_key
      ) {
        throw new Error(
          'VERTEX_AI_SERVICE_ACCOUNT_JSON is missing client_email or private_key',
        );
      }
      this.aiProvider = 'vertex';
    } else if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.aiProvider = 'gemini';
    } else {
      throw new Error(
        'Configure GEMINI_API_KEY or Vertex AI credentials (VERTEX_AI_PROJECT_ID and VERTEX_AI_SERVICE_ACCOUNT_JSON)',
      );
    }
  }

  async create(userId: string, dto: CreateMonitorDto) {
    return this.prisma.monitor.create({
      data: {
        userId,
        url: dto.url,
        sourceType: dto.sourceType ?? 'webpage',
        condition: dto.condition,
        notifyByEmail: dto.notifyByEmail ?? false,
      },
    });
  }

  async findAllForUser(userId: string) {
    return this.prisma.monitor.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const monitor = await this.prisma.monitor.findUnique({
      where: { id },
      include: { checkLogs: { orderBy: { checkedAt: 'desc' } } },
    });
    if (!monitor) throw new NotFoundException('Monitor not found');
    if (monitor.userId !== userId)
      throw new ForbiddenException('Access denied');
    return monitor;
  }

  async update(userId: string, id: string, dto: UpdateMonitorDto) {
    const monitor = await this.prisma.monitor.findUnique({ where: { id } });
    if (!monitor) throw new NotFoundException('Monitor not found');
    if (monitor.userId !== userId)
      throw new ForbiddenException('Access denied');
    return this.prisma.monitor.update({
      where: { id },
      data: {
        url: dto.url ?? monitor.url,
        sourceType: dto.sourceType ?? monitor.sourceType,
        condition: dto.condition ?? monitor.condition,
        notifyByEmail: dto.notifyByEmail ?? monitor.notifyByEmail,
        status: dto.status ?? monitor.status,
      },
    });
  }

  async remove(userId: string, id: string) {
    const monitor = await this.prisma.monitor.findUnique({ where: { id } });
    if (!monitor) throw new NotFoundException('Monitor not found');
    if (monitor.userId !== userId)
      throw new ForbiddenException('Access denied');
    return this.prisma.monitor.delete({ where: { id } });
  }

  async check(userId: string, id: string) {
    const monitor = await this.prisma.monitor.findUnique({ where: { id } });
    if (!monitor) throw new NotFoundException('Monitor not found');
    if (monitor.userId !== userId)
      throw new ForbiddenException('Access denied');
    return this.runCheck(monitor);
  }

  async checkAll() {
    const activeMonitors = await this.prisma.monitor.findMany({
      where: { status: 'active' },
    });
    const results: Array<Record<string, unknown>> = [];
    for (const monitor of activeMonitors) {
      try {
        const result = await this.runCheck(monitor);
        results.push({
          monitorId: monitor.id,
          met: result.met,
          notified: result.notification !== null,
        });
      } catch (error) {
        results.push({
          monitorId: monitor.id,
          error: (error as Error).message,
        });
      }
    }
    return { checked: results.length, results };
  }

  private async runCheck(monitor: Monitor) {
    const content =
      monitor.sourceType === 'api'
        ? await this.fetchApiContent(monitor.url)
        : await this.scrapeWebpage(monitor.url);

    const verdict = await this.judgeCondition(content, monitor.condition);

    const previousLog = await this.prisma.checkLog.findFirst({
      where: { monitorId: monitor.id },
      orderBy: { checkedAt: 'desc' },
    });
    const wasAlreadyMet = previousLog?.aiVerdict === true;

    const checkLog = await this.prisma.checkLog.create({
      data: {
        monitorId: monitor.id,
        rawContent: content.slice(0, 2000),
        aiVerdict: verdict.met,
        aiReasoning: verdict.reasoning,
      },
    });

    let notification: Notification | null = null;
    if (verdict.met && !wasAlreadyMet) {
      notification = await this.prisma.notification.create({
        data: {
          monitorId: monitor.id,
          message: `Condition met: ${monitor.condition}`,
        },
      });

      if (monitor.notifyByEmail) {
        const user = await this.prisma.user.findUnique({
          where: { id: monitor.userId },
        });
        if (user) {
          await this.emailService.sendNotification(
            user.email,
            'Your monitor condition was met',
            `Your monitor for ${monitor.url} detected: ${monitor.condition}\n\nReasoning: ${verdict.reasoning}`,
          );
        }
      }
    }

    return { checkLog, notification, met: verdict.met };
  }

  private async scrapeWebpage(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; WebsiteMonitorBot/1.0)',
        },
      });
      const $ = cheerio.load(response.data as string);
      $('script, style, noscript').remove();
      const text = $('body').text().replace(/\s+/g, ' ').trim();
      return text.slice(0, this.MAX_CONTENT_LENGTH);
    } catch (error) {
      this.logger.error('Failed to scrape webpage', error);
      throw new BadRequestException('Failed to fetch or parse the monitor URL');
    }
  }

  private async fetchApiContent(url: string): Promise<string> {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      return JSON.stringify(response.data).slice(0, this.MAX_CONTENT_LENGTH);
    } catch (error) {
      this.logger.error('Failed to fetch API content', error);
      throw new BadRequestException('Failed to fetch the monitor API endpoint');
    }
  }

  private async judgeCondition(
    content: string,
    condition: string,
  ): Promise<ConditionVerdict> {
    if (this.aiProvider === 'mock') {
      return this.judgeWithMock(content, condition);
    }

    const prompt = `You are monitoring a webpage or API for a specific condition.

Condition to check: "${condition}"

Current content:
"""
${content}
"""

Respond with ONLY a JSON object, no markdown formatting, no code fences, exactly in this shape:
{
  "met": true or false,
  "reasoning": "a brief explanation of why the condition is or isn't met, based on the content"
}`;

    let text = '';
    try {
      text =
        this.aiProvider === 'vertex'
          ? await this.generateWithVertex(prompt)
          : await this.generateWithGemini(prompt);
    } catch (error) {
      this.logger.error('Gemini API call failed', error);
      throw new InternalServerErrorException('Failed to reach the AI service');
    }

    try {
      const cleaned = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleaned) as ConditionVerdict;
    } catch (error) {
      this.logger.error(
        `Failed to parse AI response as JSON. Raw response: ${text}`,
        error,
      );
      throw new InternalServerErrorException(
        'AI returned an unexpected response format',
      );
    }
  }

  private judgeWithMock(content: string, condition: string): ConditionVerdict {
    const normalizedContent = content.toLowerCase();
    const normalizedCondition = condition.toLowerCase();
    const isOpen =
      normalizedContent.includes('"jobpostingopen":true') ||
      normalizedContent.includes('applications are now open');
    const asksWhetherOpen = /\b(open|available|reopen)/.test(
      normalizedCondition,
    );
    const met = asksWhetherOpen ? isOpen : false;
    return {
      met,
      reasoning: met
        ? 'Local demo mode detected that the controlled test listing is open.'
        : 'Local demo mode did not detect the requested condition in the controlled test content.',
    };
  }

  private async generateWithGemini(prompt: string): Promise<string> {
    const model = this.genAI!.getGenerativeModel({ model: this.modelName });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  private async generateWithVertex(prompt: string): Promise<string> {
    const accessToken = await this.getVertexAccessToken();
    const endpoint = `https://${this.vertexLocation}-aiplatform.googleapis.com/v1/projects/${this.vertexProjectId}/locations/${this.vertexLocation}/publishers/google/models/${this.modelName}:generateContent`;
    const response = await axios.post<VertexGenerateResponse>(
      endpoint,
      {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0,
        },
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        timeout: 30000,
      },
    );
    const text = response.data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? '')
      .join('');
    if (!text) throw new Error('Vertex AI returned no text response');
    return text;
  }

  private async getVertexAccessToken(): Promise<string> {
    if (
      this.vertexAccessToken &&
      this.vertexAccessToken.expiresAt > Date.now() + 60_000
    ) {
      return this.vertexAccessToken.value;
    }

    const account = this.vertexServiceAccount!;
    const now = Math.floor(Date.now() / 1000);
    const encode = (value: string) => Buffer.from(value).toString('base64url');
    const unsignedToken = `${encode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${encode(
      JSON.stringify({
        iss: account.client_email,
        scope: 'https://www.googleapis.com/auth/cloud-platform',
        aud: account.token_uri ?? 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
      }),
    )}`;
    const signer = createSign('RSA-SHA256');
    signer.update(unsignedToken);
    signer.end();
    const assertion = `${unsignedToken}.${signer.sign(account.private_key, 'base64url')}`;
    const tokenResponse = await axios.post<GoogleTokenResponse>(
      account.token_uri ?? 'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 15000,
      },
    );
    this.vertexAccessToken = {
      value: tokenResponse.data.access_token,
      expiresAt: Date.now() + tokenResponse.data.expires_in * 1000,
    };
    return this.vertexAccessToken.value;
  }
}

interface VertexServiceAccount {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
}

interface VertexGenerateResponse {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
}
