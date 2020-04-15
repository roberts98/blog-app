import { IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(10, {
    message: 'Comment must be at least 10 characters long',
  })
  body: string;
}
