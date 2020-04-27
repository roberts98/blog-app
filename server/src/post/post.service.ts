import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePostDto } from './dto/createPost.dto';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { CommentRepository } from '../comment/comment.repository';
import { CreateCommentDto } from 'src/comment/dto/createComment.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: PostRepository,
    @InjectRepository(Comment) private commentRepository: CommentRepository,
  ) {}

  createPost(createPostDto: CreatePostDto, user: User) {
    return this.postRepository.createPost(createPostDto, user);
  }

  getPosts(show: number, skip: number) {
    return this.postRepository.getPosts(show, skip);
  }

  /**
   * @todo
   *
   * add method in postrepository to retrieve posts for slider based on displayOnSlider field value
   */
  getSliderPosts() {
    return this.postRepository.getPosts(3, 0);
  }

  getPost(id: number) {
    return this.postRepository.getPost(id);
  }

  getComments(postId: number) {
    return this.commentRepository.getCommentsForPost(postId);
  }

  addComment(user: User, postId: number, createCommentDto: CreateCommentDto) {
    return this.commentRepository.createComment(createCommentDto, user, postId);
  }
}
