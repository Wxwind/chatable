import { Module } from '@nestjs/common';
import { AIChatMessageController } from './ai-chat-message.controller';
import { AIChatMessageService } from './ai-chat-message.service';

@Module({
  providers: [AIChatMessageService],
  exports: [AIChatMessageService],
  controllers: [AIChatMessageController],
})
export class AIChatSessionModule {}
