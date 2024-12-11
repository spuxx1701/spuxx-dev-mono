import { NotFoundException } from '@nestjs/common';
import { appExceptions } from '@src/config/app.exceptions';

export const usersExceptions = {
  findMany: {
    ...appExceptions.protected,
  },
  findById: {
    ...appExceptions.protected,
    notFound: new NotFoundException(),
  },
};
