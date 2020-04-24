import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { User } from '../user/user.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
    postId: number,
  ): Promise<Comment> {
    try {
      const { body } = createCommentDto;

      const comment = new Comment();
      comment.body = body;
      comment.user = user;
      comment.postId = postId;
      comment.createdAt = new Date();

      await comment.save();

      delete comment.user.password;
      delete comment.user.salt;
      delete comment.user.posts;
      delete comment.user.comments;
      delete comment.post;

      return comment;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getCommentsForPost(postId: number): Promise<Comment[]> {
    try {
      const comments = await this.createQueryBuilder('comment')
        .where('comment.postId = :postId', { postId })
        .innerJoin('comment.user', 'user')
        .addSelect(['user.username'])
        .getMany();

      return comments;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
