import { ApiProperty } from '@nestjs/swagger';
import { AIChatMessageSender } from '../ai-chat-message.entity';

export class AIChatMessageBase {
  @ApiProperty()
  id: number;

  @ApiProperty({
    enum: AIChatMessageSender,
  })
  sender: AIChatMessageSender;

  @ApiProperty()
  message: string;
}
