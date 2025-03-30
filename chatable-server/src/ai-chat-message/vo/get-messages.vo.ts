import { ApiProperty } from '@nestjs/swagger';
import { AIChatMessageSender } from '../ai-chat-message.entity';

export class GetMessagesVo {
  messages: AIChatMessageBase[];
}

export class AIChatMessageBase {
  @ApiProperty({
    enum: AIChatMessageSender,
  })
  sender: AIChatMessageSender;

  @ApiProperty()
  message: string;
}
