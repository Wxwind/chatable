import { Injectable } from '@nestjs/common';
import { AIChatSession } from './ai-chat-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from '@/user/user.entity';
import { ApiException } from '@/common/apiException';
import { ErrorCode } from '@/common/api/errorCode';

@Injectable()
export class AIChatSessionService {
  constructor(
    @InjectRepository(AIChatSession)
    private aiChatSessionRepo: Repository<AIChatSession>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async save(dto: { userId: number; modelName: string }): Promise<AIChatSession> {
    const entity = this.aiChatSessionRepo.create(dto);
    const newEntity = await this.aiChatSessionRepo.save(entity);
    return newEntity;
  }

  async findAll(userId: number): Promise<AIChatSession[]> {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ApiException(ErrorCode.USER_NOT_FOUND, 'user not found');
    }
    const res = await this.aiChatSessionRepo.find({
      where: {
        user,
      },
      withDeleted: false,
    });

    return res;
  }

  async remove(sessionId: number): Promise<void> {
    await this.aiChatSessionRepo.softDelete(sessionId);
  }

  async getMessages(sessionId: number) {
    await this.aiChatSessionRepo.find({
      where: {
        id: sessionId,
      },
      relations: ['aiChatMessages'],
    });
  }

  async findDeleted(): Promise<AIChatSession[]> {
    return this.aiChatSessionRepo.find({
      withDeleted: true,
      where: {
        deletedAt: Not(IsNull()),
      },
    });
  }

  async restore(id: number): Promise<void> {
    await this.aiChatSessionRepo.restore(id);
  }
}
