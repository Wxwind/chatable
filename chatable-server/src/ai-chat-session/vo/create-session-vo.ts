import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionVo {
  @ApiProperty()
  sessionId: number;
}
