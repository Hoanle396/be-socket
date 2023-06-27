import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Users } from 'src/entities/user.entity';
import { Pagination, ResponsePaginate } from 'src/utils/paginate';

import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly UserRepo: Repository<Users>
  ) {}

  async findOne(email: string) {
    return await this.UserRepo.findOne({ where: { email: email } });
  }

  async save(user: CreateUserDto) {
    return await this.UserRepo.save(user);
  }
  async findAll(paginate: Pagination): Promise<ResponsePaginate<Users>> {
    try {
      const [data, count] = await this.UserRepo.findAndCount({
        skip: paginate.skip,
        take: paginate.limit,
      });

      return {
        meta: {
          page: paginate.skip / paginate.limit + 1,
          totalItems: count,
          totalPage: Math.ceil(count / paginate.limit),
          message: 'string',
          status: 200,
        },
        data: data,
      };
    } catch {
      throw new NotFoundException({ status: 404, message: 'No data found' });
    }
  }
}
