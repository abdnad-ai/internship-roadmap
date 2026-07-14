import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService 
{
  private genAI: GoogleGenerativeAI;
  private readonly MAX_INPUT_LENGTH = 2000;

  constructor(private config: ConfigService) {
    const apiKey = this.config.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  buildPrompt(template: string, variables: Record<string, string>): string {
    let prompt = template;
    for (const key in variables) {
      prompt = prompt.replace(`{{${key}}}`, variables[key]);
    }
    return prompt;
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!prompt || prompt.trim().length === 0) {
      throw new BadRequestException('Prompt cannot be empty');
    }

    if (prompt.length > this.MAX_INPUT_LENGTH) {
      throw new BadRequestException(
        `Prompt exceeds maximum length of ${this.MAX_INPUT_LENGTH} characters`,
      );
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate AI response');
    }

    
  }

  async *generateStreamingResponse(prompt: string): AsyncGenerator<string> {
    if (!prompt || prompt.trim().length === 0) {
      throw new BadRequestException('Prompt cannot be empty');
    }

    if (prompt.length > this.MAX_INPUT_LENGTH) {
      throw new BadRequestException(
        `Prompt exceeds maximum length of ${this.MAX_INPUT_LENGTH} characters`,
      );
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const styledPrompt = `Respond in plain conversational text. Avoid markdown formatting like asterisks for bold or italics, and avoid em dashes, use plain sentences and commas instead.\n\n${prompt}`;
      const result = await model.generateContentStream(styledPrompt);

      for await (const chunk of result.stream) { 
        const text = chunk.text();
        if (text) {
          yield text;
        }
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate streaming AI response');
    }
  } 

  async generateSupportResponse(query: string): Promise<{
    response: string;
    category: string;
    priority: string;
  }> {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException('Query cannot be empty');
    }

    if (query.length > this.MAX_INPUT_LENGTH) {
      throw new BadRequestException(
        `Query exceeds maximum length of ${this.MAX_INPUT_LENGTH} characters`,
      );
    }

    const structuredPrompt = `You are a customer support agent. A user has submitted this support query:

"${query}"

Respond with ONLY a JSON object, no markdown formatting, no code fences, exactly in this shape:
{
  "response": "a helpful, friendly support response addressing the query directly, plain text, no markdown",
  "category": "one of: Billing, Technical, Account, General",
  "priority": "one of: Low, Medium, High"
}`;

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const result = await model.generateContent(structuredPrompt);
      const text = result.response.text();
      const cleaned = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return {
        response: parsed.response,
        category: parsed.category,
        priority: parsed.priority,
      };
    } catch (error:any) {
      if (error?.status === 429) {
        throw new InternalServerErrorException(
          'The AI service is temporarily rate limited, please wait a moment and try again.',
        );
      }
      throw new InternalServerErrorException('Failed to generate support response');
    }  
  } 
}  