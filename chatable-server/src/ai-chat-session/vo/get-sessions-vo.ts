import { ApiProperty } from '@nestjs/swagger';

export class GetSessionsVo {
  @ApiProperty()
  sessions: Sessions[];
}

export class Sessions {
  id: number;
  modelName: string;
}
