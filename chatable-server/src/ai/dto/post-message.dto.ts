import { ApiProperty } from '@nestjs/swagger';

export class PostMessageDto {
  @ApiProperty()
  sessionId: string;
  @ApiProperty()
  message: string;
}
