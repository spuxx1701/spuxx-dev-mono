import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { List } from '../models/list.model';
import { Request } from 'express';
import { getSession, Mapper } from '@spuxx/nest-utils';
import { ListCreateResource } from '../dtos/list.create.resource';
import { listsExceptions } from '../config/lists.exceptions';
import { UsersRegistrar } from '@spuxx-api/src/users/services/users.registrar';
import { ListUpdateResource } from '../dtos/list.update.resource';

@Injectable()
export class ListsProvider {
  constructor(
    @InjectModel(List) private model: typeof List,
    private readonly usersRegistrar: UsersRegistrar,
    private readonly mapper: Mapper,
  ) {}

  /**
   * Returns all of the user's lists. Includes both owned lists and lists that the user
   * is a member of.
   * @param request The request.
   * @returns All of the user's lists.
   */
  async findMany(request: Request): Promise<List[]> {
    const { sub } = getSession(request);
    return this.model.findAll({
      where: {
        ownerId: sub,
      },
      include: ['owner'],
    });
  }

  /**
   * Returns a specific list by id. Doubles as an invite link: When called by a user
   * that not never visited this list before, the user will be added to the list as a guest.
   * @param id The id of the list.
   * @param _request The request.
   * @returns All of the user's lists.
   */
  async findById(id: string): Promise<List> {
    const list = await this.model.findByPk(id, {
      include: ['owner'],
    });
    if (!list) throw listsExceptions.findById.notFound;
    return list;
  }

  /**
   * Creates a new list. The list will be owned by the user who created it.
   * @param request The request.
   * @param resource The resource.
   * @returns The newly created list.
   */
  async create(resource: ListCreateResource, request: Request): Promise<List> {
    await this.usersRegistrar.registerUserVisit(request);
    const { sub, preferred_username } = getSession(request);
    const newList: List = this.mapper.map(resource, ListCreateResource, List);
    newList.set('ownerId', sub);
    const { id } = await newList.save();
    const createdList = await this.findById(id);
    Logger.log(
      `User '${preferred_username}' has created list '${createdList.id}'.`,
      ListsProvider.name,
    );
    return createdList;
  }

  /**
   * Updates the list.
   * @param id The id of the list.
   * @param request The request.
   * @param resource The resource.
   * @returns The updated list.
   */
  async update(id: string, resource: ListUpdateResource, request: Request): Promise<List> {
    const { sub, preferred_username } = getSession(request);
    const list = await this.findById(id);
    if (sub !== list.ownerId) throw listsExceptions.update.notOwner;
    for (const key in resource) {
      list.set(key, resource[key as keyof typeof resource]);
    }
    const updatedList = await list.save();
    Logger.log(
      `User '${preferred_username}' has updated list '${updatedList.id}'.`,
      ListsProvider.name,
    );
    return updatedList;
  }

  async delete(id: string, request: Request): Promise<void> {
    const { sub, preferred_username } = getSession(request);
    try {
      const list = await this.findById(id);
      if (sub !== list.ownerId) throw listsExceptions.delete.notOwner;
      await list.destroy();
      Logger.log(`User '${preferred_username}' has updated list '${list.id}'.`, ListsProvider.name);
    } catch (error) {
      return;
    }
  }
}
