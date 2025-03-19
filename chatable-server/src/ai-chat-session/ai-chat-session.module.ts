import { Module } from '@nestjs/common';
import { AIChatSessionService } from './ai-chat-session.service';
import { AIChatSessionController } from './ai-chat-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AIChatSession } from './ai-chat-session.entity';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AIChatSession]), UserModule],
  providers: [AIChatSessionService],
  exports: [AIChatSessionService],
  controllers: [AIChatSessionController],
})
export class AIChatSessionModule {}
