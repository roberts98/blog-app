import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @MinLength(10, {
    message: 'Comment must be at least 10 characters long',
  })
  body: string;
}
