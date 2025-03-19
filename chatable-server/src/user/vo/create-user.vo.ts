import { ApiProperty } from '@nestjs/swagger';

export class CreateUserVo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  createTime: Date;
  @ApiProperty()
  updateTime: Date;
}
