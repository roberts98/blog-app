import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Body,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { UserService } from './user.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUserDto';
import { editFileName } from '../utils/avatar';

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

  @Patch('avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  uploadAvatar(@GetUser() user: User, @UploadedFile() avatar) {
    return this.userService.updateAvatar(user, avatar.filename);
  }

  @Get('avatar')
  getAvatar(@GetUser() user) {
    return user.avatar;
  }
}
