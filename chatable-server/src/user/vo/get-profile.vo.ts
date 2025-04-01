import { ApiProperty } from '@nestjs/swagger';

export class GetProfileVo {
  @ApiProperty()
  username: string;
  @ApiProperty()
  avatar: string;
}
