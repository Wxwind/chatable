import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AIChatMessage } from './ai-chat-message.entity';

@Injectable()
export class AIChatMessageService {
  constructor(
    @InjectRepository(AIChatMessage)
    private aiChatMessageRepo: Repository<AIChatMessage>
  ) {}
}
