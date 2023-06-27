import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { UsersService } from './users.service';
import { GetPagination, Pagination } from 'src/utils/paginate';


@ApiTags('/api/users')
@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/userInfor')
  async getInfoByUser(@Req() req, @Res() res: Response) {
    const { password, ...user } = await this.usersService.findOne(
      req.user.email
    );

    return res
      .status(HttpStatus.OK)
      .json({ status: 200, message: 'Fetch data success', data: user });
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/users')
  async getUsers(
    @GetPagination() pagination: Pagination,
    @Req() req,
    @Res() res: Response
  ) {
    const data = await this.usersService.findAll(pagination);

    return res.status(HttpStatus.OK).json(data);
  }
}
