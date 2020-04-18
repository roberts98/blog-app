import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v1 as uuid } from 'uuid';

import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUserDto';
import { UserRepository } from './user.repository';
import { awsConfig } from 'src/config/awsConfig';

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
        throw new UnauthorizedException('Password is not valid!');
      }

      if (password === oldPassword) {
        throw new UnprocessableEntityException(
          'Old password cannot be the same as new password!',
        );
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
      if (
        error.response.statusCode === 401 ||
        error.response.statusCode === 422
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateAvatar(
    user: User,
    avatar: any,
    cb: (url: string) => void,
  ): Promise<any> {
    const s3 = new AWS.S3(awsConfig);
    const S3_BUCKET = process.env.S3_BUCKET || 'vue-nest-blog';
    const fileName = avatar.originalname + uuid();

    const fileType = avatar.mimetype;
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: avatar.buffer,
      Expires: null,
      ContentType: fileType,
      ACL: 'public-read',
    };

    s3.upload(s3Params, (err: any) => {
      if (err) {
        throw new InternalServerErrorException();
      }

      const url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;
      this.userRepository.updateAvatar(user, url);
      cb(url);
    });
  }
}
