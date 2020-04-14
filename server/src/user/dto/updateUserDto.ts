import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(6, {
    message: 'Old password must be at least 6 characters',
  })
  @MaxLength(20, {
    message: `Old password can't be longer than 20 characters`,
  })
  oldPassword: string;

  @IsString()
  @IsOptional()
  @MinLength(6, {
    message: 'New password must be at least 6 characters',
  })
  @MaxLength(20, {
    message: `New password can't be longer than 20 characters`,
  })
  password: string;

  @IsString()
  @IsOptional()
  bio: string;
}
