import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  Entity,
  OneToMany,
} from 'typeorm';

import { User } from '../auth/user.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  summary: string;

  @Column()
  thumbnail: string;

  @Column()
  createdAt: Date;

  @ManyToOne(type => User, user => user.posts, { eager: false })
  user: User;

  @Column()
  userId: number;

  @OneToMany(type => Comment, comment => comment.post, { eager: true })
  comments: Comment[];
}
