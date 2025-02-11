import { IsString, MinLength, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  title: string;

  @ApiProperty()
  @MinLength(50)
  @IsString()
  body: string;

  @ApiProperty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsUrl()
  thumbnail: string;
}
