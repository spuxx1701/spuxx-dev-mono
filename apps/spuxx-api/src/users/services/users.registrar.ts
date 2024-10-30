import { Injectable, Logger } from '@nestjs/common';
import { getSession, isAuthenticated } from '@spuxx/nest-utils';
import { Request } from 'express';
import { UsersProvider } from './users.provider';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersRegistrar {
  constructor(
    private readonly provider: UsersProvider,
    @InjectModel(User) private model: typeof User,
  ) {}

  /**
   * Registers a new login.
   * @param request The request.
   */
  async registerUserVisit(request: Request): Promise<void> {
    if (!isAuthenticated(request)) return;
    const session = getSession(request);
    try {
      const existingUser = await this.provider.findById(session.sub);
      existingUser.firstName = session.given_name;
      existingUser.familyName = session.family_name;
      existingUser.username = session.preferred_username;
      existingUser.lastSeen = new Date();
      existingUser.save();
      Logger.log(`User '${session.preferred_username}' (sub: '${session.sub}') has been seen.`, UsersRegistrar.name);
    } catch (error) {
      const newUser: IncompleteModel<User> & { id: string } = {
        id: session.sub,
        firstName: session.given_name,
        familyName: session.family_name,
        username: session.preferred_username,
        lastSeen: new Date(),
      };
      this.model.create(newUser);
      Logger.log(
        `User '${session.preferred_username}' (sub: '${session.sub}') has been registered.`,
        UsersRegistrar.name,
      );
    }
  }
}
