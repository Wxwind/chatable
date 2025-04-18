import { UserThirdAuthPlatform } from '@/user-third-auth/user-third-auth.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsIn(['phone', 'email'])
  @ApiProperty({
    enum: ['phone', 'email'],
  })
  type: 'phone' | 'email';

  @IsNotEmpty()
  @ApiProperty()
  // phone number or email
  account: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;
}

export class CreateUserByOAuth {
  openId: string;
  platform: UserThirdAuthPlatform;
  username: string;
  avatar: string;
}
