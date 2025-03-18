import { Controller, Get, Post } from '@nestjs/common';
import { AIService } from './ai.service';
import { PostMessageDto } from './dto';
import { AIChatSessionService } from '@/ai-chat-session/ai-chat-session.service';

@Controller('ai')
export class AIController {
  constructor(
    private readonly aiService: AIService,
    private readonly aiChatSessionService: AIChatSessionService
  ) {}
  @Get('chat/history-messages')
  async getChatHistory() {}

  @Post('chat')
  async chat(dto: PostMessageDto) {
    return this.aiService.chat(dto.userId, dto.sessionId, dto.message);
  }
}
