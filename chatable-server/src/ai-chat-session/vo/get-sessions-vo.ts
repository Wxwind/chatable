import { ApiProperty } from '@nestjs/swagger';

export class GetSessionsVo {
  @ApiProperty()
  sessions: Sessions[];
}

export class Sessions {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  modelName: string;
}
