import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeOrmConfig';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, PostModule],
})
export class AppModule {}
