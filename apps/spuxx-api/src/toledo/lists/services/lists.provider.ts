import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { List } from '../models/list.model';
import { Request } from 'express';
import { getSession } from '@spuxx/nest-utils';
import { ListCreateResource } from '../dtos/list.create.resource';
import { listsExceptions } from '../config/lists.exceptions';

@Injectable()
export class ListsProvider {
  constructor(@InjectModel(List) private model: typeof List) {}

  /**
   * Returns all of the user's lists. Includes both owned lists and lists that the user
   * is a member of.
   * @param request The request.
   * @returns All of the user's lists.
   */
  async findAll(request: Request): Promise<List[]> {
    const { sub } = getSession(request);
    return this.model.findAll({
      where: {
        ownerId: sub,
      },
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
    const list = await this.model.findByPk(id);
    if (!list) throw listsExceptions.findById.notFound;
    return list;
  }

  /**
   * Creates a new list. The list will be owned by the user who created it.
   * @param request The request.
   * @param resource The resource.
   * @returns
   */
  async create(resource: ListCreateResource, request: Request): Promise<List> {
    const { sub } = getSession(request);
    const newList: IncompleteModel<List> = {
      ...resource,
      ownerId: sub,
    };
    const createdList = await this.model.build<List>(newList).save();
    return createdList;
  }
}
