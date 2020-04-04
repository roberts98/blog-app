import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CommentService } from './comment.service';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}
}
