import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  body: string;

  @IsNumber()
  postId: number;
}
