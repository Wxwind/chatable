import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AIChatMessageService } from './ai-chat-message.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller('ai-chat-message')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AIChatMessageController {
  constructor(private aiChatMessageService: AIChatMessageService) {}
}
