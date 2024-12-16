import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getSession } from '@spuxx/nest-utils';
import { User } from '@src/users/models/user.model';
import { Request } from 'express';
import { Model, type ModelCtor } from 'sequelize-typescript';

/**
 * A mixin that provides access management functionalities for certain model repositories.
 * @param modelClass The model class.
 * @returns The model-specific access manager.
 */
export function AccessManagerMixin<
  TModel extends Model<TModel> & { ownerId: string; owner: User; guests?: User[] },
>(modelClass: ModelCtor<TModel>) {
  @Injectable()
  class AccessManager {
    constructor(@InjectModel(modelClass) readonly model: ModelCtor<TModel>) {}

    /**
     * Checks whether the signed in user has access to the resource.
     * Throws a `NotFoundException` in case the user does not have access.
     * @param model The resource to check access for.
     * @param request {@link Request}
     */
    async checkAccess(model: TModel, request: Request): Promise<true> {
      if (!model.guests || !model.owner) {
        model = await this.model.findByPk(model.id, {
          include: ['guests', 'owner'],
        });
      }
      const usersWithAccess = [model.owner, ...(model.guests ?? [])];
      const hasAccess = usersWithAccess.some((user) => user.id === getSession(request).sub);
      if (!hasAccess) {
        throw new NotFoundException();
      }
      return true;
    }

    /**
     * Checks whether the signed in user owns the given resource.
     * Throws a `NotFoundException`in case the user does not own the resource.
     * @param model The resource to check ownership for.
     * @param request {@link Request}
     */
    checkOwnership(model: TModel, request: Request): true {
      const { sub } = getSession(request);
      if (model.get('ownerId') !== sub) {
        throw new NotFoundException();
      }
      return true;
    }

    /**
     * Grants guest access to the given resource.
     * @param model The resource id to grant access to.
     * @param userId The user id to grant access to.
     */
    async grantGuestAccess(model: TModel, userId: string): Promise<void> {
      if (!model.guests || !model.owner) {
        model = await this.model.findByPk(model.id, {
          include: ['guests', 'owner'],
        });
      }
      const usersWithAccess = [model.owner, ...(model.guests ?? [])];
      const alreadyHasAccess = usersWithAccess.some((user) => user.id === userId);
      if (alreadyHasAccess) return;
      await model.$add('guests', userId);
    }
  }

  return AccessManager;
}
