import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  modelName: string;

  @ApiProperty()
  @IsNotEmpty()
  initialMessage: string;
}
