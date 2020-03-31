import {
  Controller,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostService } from './post.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { Comment } from 'src/comment/comment.entity';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}
  @UseGuards(AuthGuard())
  @Post()
  createPost(
    @GetUser() user: User,
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user);
  }

  @Get()
  getPosts(): Promise<PostEntity[]> {
    return this.postService.getPosts();
  }

  @Get(':postId')
  getPost(@Param('postId') id: number): Promise<PostEntity> {
    return this.postService.getPost(id);
  }

  @Get(':postId/comments')
  getComments(@Param('postId') postId: number): Promise<Comment[]> {
    return this.postService.getComments(postId);
  }
}
