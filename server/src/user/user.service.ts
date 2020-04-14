import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUserDto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUser(user: User): User {
    delete user.password;
    delete user.salt;
    user.posts = user.posts.slice(0, 5);
    user.comments = user.comments.slice(0, 5);

    return user;
  }

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const { password, bio, oldPassword } = updateUserDto;
      const isPasswordValid = await user.validatePassword(oldPassword);

      if (!isPasswordValid) {
        throw new UnauthorizedException();
      }

      if (password === oldPassword) {
        throw new UnprocessableEntityException();
      }

      if (password) {
        user.password = await this.userRepository.hashPassword(
          password,
          user.salt,
        );
      }

      if (bio) {
        user.bio = bio;
      }

      await user.save();

      delete user.password;
      delete user.salt;

      return user;
    } catch (error) {
      if (error.response.statusCode === 401) {
        throw new UnauthorizedException('Password is not valid!');
      } else if (error.response.statusCode === 422) {
        throw new UnprocessableEntityException(
          'Old password cannot be the same as new password!',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateAvatar(user: User, avatarPath: string): Promise<string> {
    return this.userRepository.updateAvatar(user, avatarPath);
  }
}
