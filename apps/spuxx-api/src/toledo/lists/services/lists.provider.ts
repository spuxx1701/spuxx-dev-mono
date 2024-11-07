import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { List } from '../models/list.model';
import { Request } from 'express';
import { getSession, Mapper } from '@spuxx/nest-utils';
import { ListCreateResource } from '../dtos/list.create.resource';
import { listsExceptions } from '../config/lists.exceptions';
import { UsersRegistrar } from '@spuxx-api/src/users/services/users.registrar';
import { ListUpdateResource } from '../dtos/list.update.resource';
import { FindOptions } from 'sequelize';
import { UsersProvider } from '@spuxx-api/src/users/services/users.provider';
import { ListsAccessManager } from './lists.access-manager';

@Injectable()
export class ListsProvider {
  constructor(
    @InjectModel(List) private model: typeof List,
    private readonly accessManager: ListsAccessManager,
    private readonly usersRegistrar: UsersRegistrar,
    private readonly usersProvider: UsersProvider,
    private readonly mapper: Mapper,
  ) {}

  /**
   * Returns all of the user's lists. Includes both owned lists and lists that the user
   * is a member of.
   * @param request {@link Request}
   * @param options (optional) {@link FindOptions}
   * @returns All of the user's lists.
   */
  async findMany(request: Request, options?: FindOptions<List>): Promise<List[]> {
    const { sub } = getSession(request);
    return this.model.findAll({
      ...options,
      where: {
        ownerId: sub,
      },
    });
  }

  /**
   * Returns a specific list by id.
   * @param id The id of the list.
   * @param options {@link Request}
   * @param options (optional) {@link FindOptions}
   * @returns The list.
   */
  async findById(id: string, request: Request, options?: FindOptions<List>): Promise<List> {
    const list = await this.model.findByPk(id, options);
    if (!list) throw listsExceptions.findById.notFound;
    await this.accessManager.checkAccess(list, request);
    return list;
  }

  /**
   * Creates a new list. The list will be owned by the user who created it.
   * @param resource The resource.
   * @param request {@link Request}
   * @returns The newly created list.
   */
  async create(resource: ListCreateResource, request: Request): Promise<List> {
    await this.usersRegistrar.registerUserVisit(request);
    const { sub, preferred_username } = getSession(request);
    const newList: List = this.mapper.map(resource, ListCreateResource, List);
    newList.set('ownerId', sub);
    const { id } = await newList.save();
    const createdList = await this.findById(id, request);
    Logger.log(
      `User '${preferred_username}' has created list '${createdList.id}'.`,
      ListsProvider.name,
    );
    return createdList;
  }

  /**
   * Updates a list. Only the owner may update a list.
   * @param id The id of the list.
   * @param resource The resource.
   * @param request {@link Request}
   * @returns The updated list.
   */
  async update(id: string, resource: ListUpdateResource, request: Request): Promise<List> {
    const { preferred_username } = getSession(request);
    const list = await this.findById(id, request, {
      include: ['owner'],
    });
    this.accessManager.checkOwnership(list, request);
    for (const key in resource) {
      const value = resource[key as keyof typeof resource];
      if (value === undefined || value === null) continue;
      list.set(key, value);
    }
    const updatedList = await list.save();
    Logger.log(
      `User '${preferred_username}' has updated list '${updatedList.id}'.`,
      ListsProvider.name,
    );
    return updatedList;
  }

  /**
   * Deletes a list. Only the owner may delete a list.
   * @param id The if of the list.
   * @param request {@link Request}
   */
  async delete(id: string, request: Request): Promise<void> {
    const { preferred_username } = getSession(request);
    try {
      const list = await this.findById(id, request);
      this.accessManager.checkOwnership(list, request);
      await list.destroy();
      Logger.log(`User '${preferred_username}' has deleted list '${list.id}'.`, ListsProvider.name);
    } catch (error) {
      return;
    }
  }

  /**
   * Adds the signed in user as a guest to the given list.
   * @param list The list.
   * @param request {@link Request}
   * @returns The updated list.
   */
  async addListGuest(list: List, request: Request) {
    const { sub } = getSession(request);
    await this.usersRegistrar.registerUserVisit(request);
    const user = await this.usersProvider.findById(sub);
    const listWithGuests = await this.model.findByPk(list.id, {
      include: ['guests'],
    });
    const { guests } = listWithGuests;
    if (guests.find((guest) => guest.id === user.id)) return;
    guests.push(user);
    return listWithGuests.save({
      fields: ['guests'],
    });
  }
}
