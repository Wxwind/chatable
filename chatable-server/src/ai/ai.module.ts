import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';
import { AIChatSessionModule } from '@/ai-chat-session/ai-chat-session.module';
import { AIChatMessageModule } from '@/ai-chat-message/ai-chat-message.module';

@Module({
  controllers: [AIController],
  providers: [AIService],
  imports: [AIChatSessionModule, AIChatMessageModule],
})
export class AIModule {}
