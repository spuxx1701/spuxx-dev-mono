import { NotFoundException } from '@nestjs/common';
import { appExceptions } from '@src/config/app.exceptions';

export const listsExceptions = {
  findMany: {
    ...appExceptions.protected,
  },
  findById: {
    notFound: new NotFoundException(),
    ...appExceptions.protected,
  },
  create: {
    ...appExceptions.protected,
  },
};
