import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Get,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CommentService } from './comment.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}
  private logger = new Logger();

  @UseGuards(AuthGuard())
  @Post()
  createComment(
    @GetUser() user: User,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
  ): Promise<Comment> | any {
    return this.commentService.createComment(createCommentDto, user);
  }
}
