import {
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

export const appExceptions = {
  open: {
    internalServerError: new InternalServerErrorException(),
  },
  protected: {
    unauthorized: new UnauthorizedException(),
    forbidden: new ForbiddenException(),
    internalServerError: new InternalServerErrorException(),
  },
};
