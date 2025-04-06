import { ApiProperty } from '@nestjs/swagger';

export class ChatImmeVo {
  @ApiProperty()
  messageId: number;

  @ApiProperty()
  response: string;
}
