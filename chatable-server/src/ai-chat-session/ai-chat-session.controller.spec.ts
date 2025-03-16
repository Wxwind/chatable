import { Test, TestingModule } from '@nestjs/testing';
import { AIChatSessionController } from './ai-chat-session.controller';

describe('AiChatSessionController', () => {
  let controller: AIChatSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AIChatSessionController],
    }).compile();

    controller = module.get<AIChatSessionController>(AIChatSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
