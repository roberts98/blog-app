import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthModule } from '../auth/auth.module';
import { PostRepository } from './post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
