import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { usersExceptions } from '../config/users.exceptions';

@Injectable()
export class UsersProvider {
  constructor(@InjectModel(User) private model: typeof User) {}

  /**
   * Returns the list of all users.
   * @returns The list of users.
   */
  async findAll(): Promise<User[]> {
    const users = await this.model.findAll();
    return users;
  }

  /**
   * Finds and returns a user by their id.
   * @param id The id of the user to find.
   * @returns The user.
   */
  async findById(id: string): Promise<User> {
    const user = await this.model.findByPk(id);
    if (!user) throw usersExceptions.findById.notFound;
    return user;
  }
}
