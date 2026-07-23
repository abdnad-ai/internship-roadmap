import { Body, Controller, Post, Get, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { IsString, IsNotEmpty } from 'class-validator';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

class TestPromptDto {
  @IsString()
  @IsNotEmpty()
  prompt!: string;
}

@Controller('ai')
export class AiController {
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
      for await (const chunk of this.aiService.generateStreamingResponse(
        body.prompt,
      )) {
        res.write(chunk);
      }
    } catch {
      res.write('\n[error: stream interrupted]');
    } finally {
      res.end();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('support')
  async supportQuery(
    @Body() body: TestPromptDto,
    @CurrentUser() user: { id: number },
  ) {
    return this.aiService.generateSupportResponse(body.prompt, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('support/history')
  async supportHistory(@CurrentUser() user: { id: number }) {
    return this.aiService.getSupportHistory(user.id);
  }
}
