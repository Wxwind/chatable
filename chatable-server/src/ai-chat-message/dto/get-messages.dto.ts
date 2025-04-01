import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesDto {
  @ApiProperty()
  sessionId: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
}
