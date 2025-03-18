import { Injectable } from '@nestjs/common';
import { AIChatSession } from './ai-chat-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AIChatSessionService {
  constructor(
    @InjectRepository(AIChatSession)
    private aiChatSessionRepo: Repository<AIChatSession>
  ) {}

  async save(dto: { userId: number; modelName: string }): Promise<AIChatSession> {
    const entity = this.aiChatSessionRepo.create(dto);
    const newEntity = await this.aiChatSessionRepo.save(entity);
    return newEntity;
  }

  async findAll(userId: number): Promise<AIChatSession[]> {
    const res = await this.aiChatSessionRepo.find({
      where: {
        id: userId,
      },
    });

    return res;
  }

  async remove(sessionId: number): Promise<boolean> {
    const res = await this.aiChatSessionRepo.softDelete(sessionId);
    return true;
  }
}
