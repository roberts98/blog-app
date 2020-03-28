import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { AuthModule } from '../auth/auth.module';
import { CommentRepository } from './comment.repository';
import { PostRepository } from 'src/post/post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository, PostRepository]),
    AuthModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
