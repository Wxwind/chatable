import { Test, TestingModule } from '@nestjs/testing';
import { AIChatMessageService } from './ai-chat-message.service';

describe('AiChatMessageService', () => {
  let service: AIChatMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AIChatMessageService],
    }).compile();

    service = module.get<AIChatMessageService>(AIChatMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
