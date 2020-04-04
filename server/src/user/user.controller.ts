import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetUser() user: User) {
    return this.userService.getUser(user);
  }
}
