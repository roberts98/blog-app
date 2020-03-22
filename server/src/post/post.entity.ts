import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  Entity,
} from 'typeorm';

import { User } from 'src/auth/user.entity';

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
}
