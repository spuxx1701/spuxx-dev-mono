import { BadRequestException, NotFoundException } from '@nestjs/common';
import { appExceptions } from '@src/config/app.exceptions';

export const listItemsExceptions = {
  create: {
    badRequest: new BadRequestException(),
    notFound: new NotFoundException(),
    ...appExceptions.protected,
  },
  update: {
    badRequest: new BadRequestException(),
    notFound: new NotFoundException(),
    ...appExceptions.protected,
  },
  delete: {
    notFound: new NotFoundException(),
    ...appExceptions.protected,
  },
};
