import { BadRequestException, NotFoundException } from '@nestjs/common';
import { appExceptions } from '@src/config/app.exceptions';

export const recipesExceptions = {
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
    ...appExceptions.protected,
  },
  delete: {
    notFound: new NotFoundException(),
    ...appExceptions.protected,
  },
  generateInvite: {
    notFound: new NotFoundException(),
    ...appExceptions.protected,
  },
  acceptInvite: {
    badRequest: new BadRequestException(),
    notFound: new NotFoundException(),
    ...appExceptions.protected,
  },
};
