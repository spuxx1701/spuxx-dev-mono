import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersRegistrar } from '../services/users.registrar';

@Injectable()
export class UserRegistrationMiddleware implements NestMiddleware {
  constructor(private registrar: UsersRegistrar) {}

  use(req: Request, _res: Response, next: NextFunction) {
    if (req.originalUrl === '/auth/session') {
      this.registrar.registerUserVisit(req);
    }
    next();
  }
}
