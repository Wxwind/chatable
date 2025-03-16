import { Module } from '@nestjs/common';
import { AIChatSessionService } from './ai-chat-session.service';
import { AIChatSessionController } from './ai-chat-session.controller';

@Module({
  providers: [AIChatSessionService],
  exports: [AIChatSessionService],
  controllers: [AIChatSessionController],
})
export class AIChatSessionModule {}
