import { Module } from '@nestjs/common';
import { AIChatMessageController } from './ai-chat-message.controller';
import { AIChatMessageService } from './ai-chat-message.service';
import { AIChatMessage } from './ai-chat-message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AIChatMessage])],
  providers: [AIChatMessageService],
  exports: [AIChatMessageService],
  controllers: [AIChatMessageController],
})
export class AIChatMessageModule {}
