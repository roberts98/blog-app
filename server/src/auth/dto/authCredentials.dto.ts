import { IsString, MinLength, MaxLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(6, {
    message: 'Username must be at least 6 characters',
  })
  @MaxLength(20, {
    message: `Username can't be longer than 20 characters`,
  })
  username: string;

  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  @MaxLength(20, {
    message: `Password can't be longer than 20 characters`,
  })
  password: string;
}
