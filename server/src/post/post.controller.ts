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
import { GetUser } from '../user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { Comment } from 'src/comment/comment.entity';
import { CreateCommentDto } from 'src/comment/dto/createComment.dto';

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

  @UseGuards(AuthGuard())
  @Post(':postId/comments')
  addComment(
    @GetUser() user: User,
    @Param('postId') postId: number,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
  ) {
    return this.postService.addComment(user, postId, createCommentDto);
  }
}
