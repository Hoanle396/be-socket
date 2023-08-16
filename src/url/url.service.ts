import { Injectable, Redirect } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { URL } from 'src/entities/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/user.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(URL) private urlRepository: Repository<URL>,
    @InjectRepository(Users) private userRepository: Repository<Users>
  ) {}
  async create(createUrlDto: CreateUrlDto) {
    return await this.urlRepository.save(createUrlDto);
  }

  findAll() {
    return `This action returns all url`;
  }

  async findOne(id: string) {
    const data = await this.urlRepository.findOne({ where: { id: id } });
    if (data) {
      return Redirect(data.url);
    }
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
