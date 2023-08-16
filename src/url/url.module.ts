import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { URL } from 'src/entities/url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, URL])],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
