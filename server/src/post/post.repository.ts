import { EntityRepository, Repository } from 'typeorm';

import { Post } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { title, body } = createPostDto;

    const post = new Post();
    post.title = title;
    post.body = body;
    post.user = user;
    await post.save();

    delete post.user;

    return post;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.createQueryBuilder('post')
      .innerJoin('post.user', 'user')
      .addSelect(['user.username'])
      .getMany();
    return posts;
  }
}
