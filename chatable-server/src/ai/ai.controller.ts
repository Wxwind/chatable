import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AIService } from './ai.service';
import { PostMessageDto } from './dto/post-message.dto';
import { AIChatSessionService } from '@/ai-chat-session/ai-chat-session.service';
import { RequestWithAuth } from '@/auth/type';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ai')
@ApiBearerAuth()
export class AIController {
  constructor(
    private readonly aiService: AIService,
    private readonly aiChatSessionService: AIChatSessionService
  ) {}
  @Get('chat/history-messages')
  async getChatHistory() {}

  @Post('chat')
  async chat(@Body() dto: PostMessageDto, @Req() request: RequestWithAuth) {
    const userId = request.user.userId;
    return this.aiService.chat(userId, dto.sessionId, dto.message);
  }
}
