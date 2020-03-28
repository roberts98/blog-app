import { EntityRepository, Repository } from 'typeorm';

import { Post } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/auth/user.entity';

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
    const post = await this.findOne(id);

    return post;
  }
}
