import { EntityRepository, Repository } from 'typeorm';

import { Post } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/user/user.entity';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { title, body, thumbnail, summary } = createPostDto;

    const post = new Post();
    post.title = title;
    post.body = body;
    post.summary = summary;
    post.thumbnail = thumbnail;
    post.createdAt = new Date();
    post.user = user;
    await post.save();

    delete post.user;

    return post;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.createQueryBuilder('post')
      .innerJoin('post.user', 'user')
      .orderBy('post.id', 'DESC')
      .addSelect(['user.username'])
      .getMany();
    return posts;
  }

  async getPost(id: number): Promise<Post> {
    try {
      const post = await this.createQueryBuilder('post')
        .innerJoin('post.user', 'user')
        .addSelect(['user.username'])
        .where('post.id = :id', { id })
        .getOne();
      if (!post) {
        throw new NotFoundException('Post not found!');
      }

      return post;
    } catch (error) {
      if (error.response.statusCode == 404) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
