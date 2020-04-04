import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/createComment.dto';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { PostRepository } from '../post/post.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: CommentRepository,
    @InjectRepository(Post) private postRepository: PostRepository,
  ) {}
}
