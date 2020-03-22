import { IsString, MinLength, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(6)
  title: string;

  @IsString()
  body: string;

  @IsString()
  summary: string;

  @IsUrl()
  thumbnail: string;
}
