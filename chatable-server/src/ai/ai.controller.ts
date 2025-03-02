import { Controller, Get, Post } from '@nestjs/common';
import { AIService } from './ai.service';
import { PostMessageDto } from './dto';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}
  @Get('chat')
  async getChatHistory() {}

  @Post('chat')
  async chat(dto: PostMessageDto) {
    return this.aiService.chat(dto.userId, dto.sessionId, dto.message);
  }
}
