import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUserDto';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetUser() user: User) {
    return this.userService.getUser(user);
  }

  @Patch()
  updateUser(
    @GetUser() user: User,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(user, updateUserDto);
  }
}
