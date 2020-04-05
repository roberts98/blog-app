import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ readonly: true })
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Post, post => post.user, { eager: true })
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.user, { eager: true })
  comments: Comment[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
