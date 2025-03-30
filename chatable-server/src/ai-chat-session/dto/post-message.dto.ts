import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  message: string;
}
