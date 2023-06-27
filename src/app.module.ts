import { RedisModule } from '@liaoliaots/nestjs-redis';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

import { Users } from './entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'postgre',
      password: process.env.DATABASE_PASSWORD || 'postgre',
      database: process.env.DATABASE_DBNAME || 'game-be',
      entities: [Users],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT) || 6379,
        // username: process.env.REDIS_USER || 'default',
        // password: process.env.REDIS_PASSWORD || 'redis',
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),
    }),
    AuthModule,
    UsersModule,
    ChatModule,
  ],
})
export class AppModule {}
