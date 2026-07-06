import { Body, Controller, Post } from '@nestjs/common';
import { IsString, IsNotEmpty } from 'class-validator';
import { AiService } from './ai.service';

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
} 