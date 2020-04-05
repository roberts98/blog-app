import { Injectable, ConflictException } from '@nestjs/common';

import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UserService {
  getUser(user: User): User {
    delete user.password;
    delete user.salt;
    user.posts = user.posts.slice(0, 5);
    user.comments = user.comments.slice(0, 5);

    return user;
  }

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const { password, bio } = updateUserDto;
      if (password) {
        user.password = password;
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
}
