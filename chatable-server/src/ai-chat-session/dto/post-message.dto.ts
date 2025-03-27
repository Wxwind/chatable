import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string;
}
