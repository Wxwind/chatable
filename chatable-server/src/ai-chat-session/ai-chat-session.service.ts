import { ForbiddenException, Injectable } from '@nestjs/common';
import { AIChatSession } from './ai-chat-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, IsNull, Not, Repository } from 'typeorm';
import { ApiException } from '@/common/apiException';
import { ErrorCode } from '@/common/api/errorCode';
import { UserService } from '@/user/user.service';

@Injectable()
export class AIChatSessionService {
  constructor(
    @InjectRepository(AIChatSession)
    private aiChatSessionRepo: Repository<AIChatSession>,
    private userService: UserService
  ) {}

  async verifySessionOwnership(userId: number, sessionId: number): Promise<AIChatSession> {
    const session = await this.aiChatSessionRepo.findOne({
      where: { id: sessionId, user: { id: userId } },
    });

    if (!session) throw new ForbiddenException("has no right to access this session or session doesn't exist");
    return session;
  }

  async save(dto: DeepPartial<AIChatSession>): Promise<AIChatSession> {
    const entity = this.aiChatSessionRepo.create(dto);
    const newEntity = await this.aiChatSessionRepo.save(entity);
    return newEntity;
  }

  async findOne(sessionId: number): Promise<AIChatSession | null> {
    const res = await this.aiChatSessionRepo.findOne({
      where: {
        id: sessionId,
      },
      withDeleted: false,
      relations: ['user'],
    });

    return res;
  }

  async findAllByUserId(userId: number): Promise<AIChatSession[]> {
    const res = await this.aiChatSessionRepo.find({
      where: {
        user: { id: userId },
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
