import { ForbiddenException, NotFoundException } from '@nestjs/common';
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
  update: {
    notFound: new NotFoundException(),
    notOwner: new ForbiddenException(),
    ...appExceptions.protected,
  },
  delete: {
    notFound: new NotFoundException(),
    notOwner: new ForbiddenException(),
    ...appExceptions.protected,
  },
};
