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
  BadRequestException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as aws from 'aws-sdk';

import { UserService } from './user.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUserDto';
import { allowedTypes } from '../utils/avatar';

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
  @UseInterceptors(FileInterceptor('avatar'))
  uploadAvatar(
    @GetUser() user: User,
    @UploadedFile() avatar: any,
    @Res() res: Response,
  ) {
    if (allowedTypes.indexOf(avatar.mimetype) === -1) {
      throw new BadRequestException(
        'Allowed files extensions are: jpg, png, gif',
      );
    }

    if (avatar.size > 102400) {
      throw new BadRequestException('Maximum avatar size is 100kB');
    }

    this.userService.updateAvatar(user, avatar, (url: string) => res.send(url));
  }

  @Get('avatar')
  getAvatar(@GetUser() user) {
    return user.avatar;
  }

  @Get('authorize')
  validateToken(@GetUser() user, @Res() res: Response) {
    if (!user) {
      throw new UnauthorizedException();
    }

    res.status(HttpStatus.OK).send();
  }
}
