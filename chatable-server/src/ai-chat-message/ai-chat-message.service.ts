import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AIChatMessage } from './ai-chat-message.entity';
import { CreateAIChatMessageType } from './types';
import { AIChatSession } from '@/ai-chat-session/ai-chat-session.entity';

@Injectable()
export class AIChatMessageService {
  constructor(
    @InjectRepository(AIChatMessage)
    private aiChatMessageRepo: Repository<AIChatMessage>
  ) {}

  async findMessagesBySessionIdWithPagination(aiChatSession: AIChatSession, page: number = 1, limit: number = 10) {
    return this.aiChatMessageRepo.find({
      where: { aiChatSession },
      order: { createTime: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async save(params: CreateAIChatMessageType): Promise<AIChatMessage> {
    const { sender, sessionId, message } = params;
    const session = new AIChatSession();
    session.id = sessionId;
    const entity = this.aiChatMessageRepo.create({ sender, message, aiChatSession: session });
    const newEntity = await this.aiChatMessageRepo.save(entity);
    return newEntity;
  }
}
