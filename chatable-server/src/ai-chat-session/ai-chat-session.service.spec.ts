import { Test, TestingModule } from '@nestjs/testing';
import { AIChatSessionService } from './ai-chat-session.service';

describe('AiChatSessionService', () => {
  let service: AIChatSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AIChatSessionService],
    }).compile();

    service = module.get<AIChatSessionService>(AIChatSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
