import { Injectable } from '@nestjs/common';

import { User } from './user.entity';

@Injectable()
export class UserService {
  getUser(user: User): User {
    delete user.password;
    delete user.salt;
    user.posts = user.posts.slice(0, 5);
    user.comments = user.comments.slice(0, 5);

    return user;
  }
}
