import {
  Injectable,
  ConflictException,
  UnauthorizedException,
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
      return user;
    } catch (error) {
      throw new ConflictException();
    }
  }

  async updateAvatar(user: User, avatarPath: string): Promise<string> {
    return this.userRepository.updateAvatar(user, avatarPath);
  }
}
