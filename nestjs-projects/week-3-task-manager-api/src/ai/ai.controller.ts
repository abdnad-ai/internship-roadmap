import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { IsString, IsNotEmpty } from 'class-validator';
import { AiService } from './ai.service';

class TestPromptDto {
  @IsString()
  @IsNotEmpty()
  prompt!: string;
}

@Controller('ai') 
export class AiController 
{
  constructor(private readonly aiService: AiService) {}

  @Post('test')
  async testPrompt(@Body() body: TestPromptDto) {
    const response = await this.aiService.generateResponse(body.prompt);
    return { response };
  }

  @Post('stream')
  async streamPrompt(@Body() body: TestPromptDto, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');

    try {
      for await (const chunk of this.aiService.generateStreamingResponse(body.prompt)) {
        res.write(chunk);
      }
    } catch (error) {
      res.write('\n[error: stream interrupted]');
    } finally {
      res.end();
    }
  } 

  @Post('support')
  async supportQuery(@Body() body: TestPromptDto) {
    return this.aiService.generateSupportResponse(body.prompt);
  } 
} 