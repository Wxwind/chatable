import { ApiProperty } from '@nestjs/swagger';

export class LoginVo {
  @ApiProperty()
  access_token: string;
}
