import { Injectable, NotFoundException } from '@nestjs/common';
import { List } from '../models/list.model';
import { type Request } from 'express';
import { getSession } from '@spuxx/nest-utils';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class ListsAccessManager {
  constructor(@InjectModel(List) private model: typeof List) {}

  /**
   * Checks whether the signed in user has access to the given list. Throws a `NotFoundException`
   * in case the user does not have access.
   * @param list The list to check access for.
   * @param request {@link Request}
   */
  async checkAccess(list: List, request: Request): Promise<true> {
    if (!list.guests || !list.owner) {
      list = await this.model.findByPk(list.id, {
        include: ['guests', 'owner'],
      });
    }
    const usersWithAccess = [list.owner, ...list.guests];
    const hasAccess = usersWithAccess.some((user) => user.id === getSession(request).sub);
    if (!hasAccess) {
      throw new NotFoundException();
    }
    return true;
  }

  /**
   * Checks whether the signed in user owns the given list. Throws a `NotFoundException` in case
   * the user does not own the list.
   * @param list The list to check ownership for.
   * @param request {@link Request}
   */
  checkOwnership(list: List, request: Request): true {
    const { sub } = getSession(request);
    if (list.ownerId !== sub) {
      throw new NotFoundException();
    }
    return true;
  }

  /**
   * Grants guest access to the given list.
   * @param list The list id to grant access to.
   * @param userId The user id to grant access to.
   */
  async grantGuestAccess(list: List, userId: string): Promise<void> {
    if (!list.guests || !list.owner) {
      list = await this.model.findByPk(list.id, {
        include: ['guests', 'owner'],
      });
    }
    const { guests, owner } = list;
    const usersWithAccess = [owner, ...guests];
    const alreadyHasAccess = usersWithAccess.some((user) => user.id === userId);
    if (alreadyHasAccess) return;
    await list.$add('guests', userId);
  }
}
