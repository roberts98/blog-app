import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(6)
  title: string;

  @IsString()
  body: string;
}
