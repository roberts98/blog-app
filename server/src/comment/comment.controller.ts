import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
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
}
