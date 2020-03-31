import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthModule } from '../auth/auth.module';
import { PostRepository } from './post.repository';
import { CommentRepository } from 'src/comment/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository, CommentRepository]),
    AuthModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
