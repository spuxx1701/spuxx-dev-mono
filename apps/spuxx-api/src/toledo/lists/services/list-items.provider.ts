import { Injectable, Logger } from '@nestjs/common';
import { ListItem } from '../models/list-item.model';
import { ListItemCreateResource } from '../dtos/list-item.create.resource';
import { ListsProvider } from './lists.provider';
import { Request } from 'express';
import { ListsAccessManager } from './lists.access-manager';
import { getSession, Mapper } from '@spuxx/nest-utils';
import { ListItemUpdateResource } from '../dtos/list-item.update.resource';
import { listItemsExceptions } from '../config/list-items.exceptions';
@Injectable()
export class ListItemsProvider {
  constructor(
    private readonly listsProvider: ListsProvider,
    private readonly accessManager: ListsAccessManager,
    private readonly mapper: Mapper,
  ) {}

  /**
   * Creates a new list item on the specified list.
   * @param listId The list id.
   * @param resource The resource.
   * @param request {@link Request}
   */
  async create(
    listId: string,
    resource: ListItemCreateResource,
    request: Request,
  ): Promise<ListItem> {
    const { preferred_username } = getSession(request);
    const list = await this.listsProvider.findById(listId, request, {
      include: ['guests', 'items'],
    });
    await this.accessManager.checkAccess(list, request);
    const newItem = this.mapper.map(resource, ListItemCreateResource, ListItem);
    newItem.listId = list.id;
    const createdItem = newItem.save();
    Logger.log(
      `User '${preferred_username}' has created list item '${newItem.id}'.`,
      ListsProvider.name,
    );
    return createdItem;
  }

  /**
   * Updates a list item.
   * @param listId The list id.
   * @param itemId The item id.
   * @param resource The resource.
   * @param request {@link Request}
   */
  async update(
    listId: string,
    itemId: string,
    resource: ListItemUpdateResource,
    request: Request,
  ): Promise<ListItem> {
    const { preferred_username } = getSession(request);
    const list = await this.listsProvider.findById(listId, request, {
      include: ['guests', 'items'],
    });
    await this.accessManager.checkAccess(list, request);
    const item = list.items.find((element) => element.id === itemId);
    if (!item) throw listItemsExceptions.update.notFound;
    for (const key in resource) {
      const value = resource[key as keyof typeof resource];
      if (value === undefined || value === null) continue;
      item.set(key, value);
    }
    const updatedItem = await item.save();
    Logger.log(
      `User '${preferred_username}' has updated list item '${updatedItem.id}'.`,
      ListsProvider.name,
    );
    return updatedItem;
  }

  /**
   * Deletes a list item.
   * @param listId The list id.
   * @param itemId The item id.
   * @param request {@link Request}
   */
  async delete(listId: string, itemId: string, request: Request): Promise<void> {
    const { preferred_username } = getSession(request);
    const list = await this.listsProvider.findById(listId, request, {
      include: ['guests', 'items'],
    });
    await this.accessManager.checkAccess(list, request);
    const item = list.items.find((element) => element.id === itemId);
    if (!item) return;
    await list.$remove<ListItem>('items', item);
    await list.save();
    Logger.log(
      `User '${preferred_username}' has deleted list item '${item.id}'.`,
      ListsProvider.name,
    );
    return;
  }
}
