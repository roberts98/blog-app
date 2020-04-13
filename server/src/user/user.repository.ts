import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/authCredentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if ((error.code = '23505')) {
        throw new ConflictException('User with this username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateAvatar(user: User, avatarPath: string): Promise<string> {
    user.avatar = avatarPath;

    await user.save();

    return user.avatar;
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    const isPasswordValid = await user.validatePassword(password);

    if (user && isPasswordValid) {
      delete user.password;
      delete user.salt;
      delete user.posts;
      delete user.comments;
      delete user.bio;
      delete user.avatar;

      return user;
    }

    return null;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
