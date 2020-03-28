import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePostDto } from './dto/createPost.dto';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: PostRepository) {}

  createPost(createPostDto: CreatePostDto, user: User) {
    return this.postRepository.createPost(createPostDto, user);
  }

  getPosts() {
    return this.postRepository.getPosts();
  }

  getPost(id: number) {
    return this.postRepository.getPost(id);
  }
}
