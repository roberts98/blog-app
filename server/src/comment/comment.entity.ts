import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  Entity,
} from 'typeorm';

import { User } from '../auth/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  createdAt: Date;

  @ManyToOne(type => User, user => user.comments, { eager: false })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(type => Post, post => post.comments, { eager: false })
  post: Post;

  @Column()
  postId: number;
}
