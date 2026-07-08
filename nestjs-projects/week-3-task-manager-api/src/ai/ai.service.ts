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
}  