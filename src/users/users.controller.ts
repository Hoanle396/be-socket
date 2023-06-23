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

@ApiTags('/api/users')
@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/userInfor')
  async getInforByUser(@Req() req, @Res() res: Response) {
    const user = await this.usersService.findOne(req.user.email);

    return res
      .status(HttpStatus.OK)
      .json({ status: 200, message: 'Fetch data success', data: user });
  }
}
