import { NotFoundException } from '@nestjs/common';

export const usersExceptions = {
  findById: {
    notFound: new NotFoundException(),
  },
};
