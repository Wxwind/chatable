import { IsPhoneOrEmail } from '@/decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneOrEmail()
  // email or phone number
  account: string;

  @IsNotEmpty()
  @ApiProperty()
  @Length(6, 32)
  password: string;
}
