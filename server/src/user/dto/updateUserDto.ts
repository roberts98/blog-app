import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  bio: string;
}
