import { Test, TestingModule } from '@nestjs/testing';
import { AIChatMessageController } from './ai-chat-message.controller';

describe('AiChatMessageController', () => {
  let controller: AIChatMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AIChatMessageController],
    }).compile();

    controller = module.get<AIChatMessageController>(AIChatMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
