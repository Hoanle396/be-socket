import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Request } from 'express';

export class Pagination {
  @ApiProperty()
  skip?: number;
  @ApiProperty()
  limit?: number;
  @ApiProperty()
  sort?: { field: string; by: 'ASC' | 'DESC' }[];
  @ApiProperty()
  search?: { field: string; value: string }[];
}
export interface ResponsePaginate<T> {
  meta: {
    totalItems: number;
    page: number;
    totalPage: number;
    status?: number;
    message?: string;
  };

  data: T[];
}

export const GetPagination = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();

    const paginationParams: Pagination = {
      skip: 0,
      limit: 10,
      sort: [],
      search: [],
    };

    paginationParams.skip = req.query.skip
      ? parseInt(req.query.skip.toString())
      : 0;
    paginationParams.limit = req.query.limit
      ? parseInt(req.query.limit.toString())
      : 10;

    // create array of sort
    if (req.query.sort) {
      const sortArray = req.query.sort.toString().split(',');
      paginationParams.sort = sortArray.map((sortItem) => {
        const sortBy = sortItem[0];
        switch (sortBy) {
          case '-':
            return {
              field: sortItem.slice(1),
              by: 'ASC',
            };
          case '+':
            return {
              field: sortItem.slice(1),
              by: 'ASC',
            };
          default:
            return {
              field: sortItem.trim(),
              by: 'DESC',
            };
        }
      });
    }

    // create array of search
    if (req.query.search) {
      const searchArray = req.query.search.toString().split(',');
      paginationParams.search = searchArray.map((searchItem) => {
        const field = searchItem.split(':')[0];
        const value = searchItem.split(':')[1];
        return {
          field,
          value,
        };
      });
    }

    return paginationParams;
  }
);
