import {
  Controller,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
  Get,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { PostService } from './post.service';
import { GetUser } from '../user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { Comment } from '../comment/comment.entity';
import { CreateCommentDto } from '../comment/dto/createComment.dto';

@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}
  @UseGuards(AuthGuard())
  @Post()
  @ApiCreatedResponse({ description: 'The post has been successfully created' })
  createPost(
    @GetUser() user: User,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user);
  }

  @Get()
  @ApiOkResponse({ description: 'Posts successfully retrieved' })
  @ApiNotFoundResponse({ description: 'No posts found' })
  getPosts(): Promise<PostEntity[]> {
    return this.postService.getPosts();
  }

  @Get(':postId')
  @ApiOkResponse({ description: 'Post successfully retrieved' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  getPost(@Param('postId') id: number): Promise<PostEntity> {
    return this.postService.getPost(id);
  }

  @Get(':postId/comments')
  @ApiOkResponse({ description: 'Comments successfully retrieved' })
  getComments(@Param('postId') postId: number): Promise<Comment[]> {
    return this.postService.getComments(postId);
  }

  @UseGuards(AuthGuard())
  @Post(':postId/comments')
  @ApiCreatedResponse({
    description: 'The comment has been successfully created',
  })
  addComment(
    @GetUser() user: User,
    @Param('postId') postId: number,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
  ) {
    return this.postService.addComment(user, postId, createCommentDto);
  }
}
