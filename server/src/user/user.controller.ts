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
import {
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUserDto';
import { allowedTypes } from '../utils/avatar';
import { FileUploadDto } from './dto/fileUploadDto';

@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'User data retrieved successfully' })
  getUser(@GetUser() user: User) {
    return this.userService.getUser(user);
  }

  @Patch()
  @ApiOkResponse({ description: 'The user data has been successfully updated' })
  @ApiUnauthorizedResponse({ description: 'Invalid password ' })
  @ApiUnprocessableEntityResponse({
    description: 'The old password cannot be the same as current one',
  })
  updateUser(
    @GetUser() user: User,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(user, updateUserDto);
  }

  @Patch('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'avatar', type: FileUploadDto })
  @ApiOkResponse({ description: 'The avatar has been successfully updated' })
  @ApiBadRequestResponse({ description: 'Bad extension or too big size' })
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
  @ApiOkResponse({ description: 'Avatar successfully retrieved' })
  getAvatar(@GetUser() user) {
    return user.avatar;
  }

  @ApiOkResponse({ description: 'User successfully authorized' })
  @ApiUnauthorizedResponse({ description: 'Token is invalid' })
  @Get('authorize')
  validateToken(@GetUser() user, @Res() res: Response) {
    if (!user) {
      throw new UnauthorizedException();
    }

    res.status(HttpStatus.OK).send();
  }
}
