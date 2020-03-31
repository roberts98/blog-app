import { EntityRepository, Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { User } from '../auth/user.entity';
import { Post } from 'src/post/post.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
    post: Post,
  ): Promise<Comment> {
    const { body } = createCommentDto;

    const comment = new Comment();
    comment.body = body;
    comment.user = user;
    comment.post = post;
    comment.createdAt = new Date();

    await comment.save();

    delete comment.user;
    delete comment.post;

    return comment;
  }

  async getCommentsForPost(postId: number): Promise<Comment[]> {
    return this.createQueryBuilder('comment')
      .where('comment.postId = :postId', { postId })
      .innerJoin('comment.user', 'user')
      .addSelect(['user.username'])
      .getMany();
  }
}
