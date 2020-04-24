import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(6, {
    message: 'Old password must be at least 6 characters',
  })
  @MaxLength(20, {
    message: `Old password can't be longer than 20 characters`,
  })
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(6, {
    message: 'New password must be at least 6 characters',
  })
  @MaxLength(20, {
    message: `New password can't be longer than 20 characters`,
  })
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio: string;
}
