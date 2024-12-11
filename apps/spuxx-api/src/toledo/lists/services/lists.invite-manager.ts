import { Injectable, Logger } from '@nestjs/common';
import { type Request } from 'express';
import { getSession } from '@spuxx/nest-utils';
import { listsExceptions } from '../config/lists.exceptions';
import { EnvModule } from '@src/env/env.module';
import { generateInviteCode } from '@src/utils/invite-links/invite-links.utils';
import { InviteLinkResource } from '@src/utils/invite-links/invite-link.resource';
import { ListsProvider } from './lists.provider';
import { ListsAccessManager } from './lists.access-manager';
import { InjectModel } from '@nestjs/sequelize';
import { List } from '../models/list.model';
import { UsersRegistrar } from '@src/users/services/users.registrar';

@Injectable()
export class ListsInviteManager {
  constructor(
    @InjectModel(List) private model: typeof List,
    private readonly provider: ListsProvider,
    private readonly accessManager: ListsAccessManager,
    private readonly usersRegistrar: UsersRegistrar,
  ) {}

  /**
   * Generates a new invite link for the given list. Only the owner of the list can generate
   * invite links.
   * @param listId The list id to generate the invite link for.
   * @param request {@link Request}
   */
  async generateInvite(listId: string, request: Request): Promise<InviteLinkResource> {
    const { preferred_username } = getSession(request);
    const list = await this.provider.findById(listId, request);
    this.accessManager.checkOwnership(list, request);
    const code = generateInviteCode();
    await list.update({ inviteCode: code });
    Logger.log(
      `User '${preferred_username}' has generated an invite link for list '${list.id}'.`,
      ListsProvider.name,
    );
    return {
      link: `${EnvModule.get('APP_BASE_URL')}/toledo/lists/${list.id}/accept-incite?code=${code}`,
      code,
    };
  }

  /**
   * Accepts an invite link for the given list.
   * @param listId The list id to accept the invite link for.
   * @param code The invite code to accept.
   * @param request {@link Request}
   */
  async acceptInvite(listId: string, code: string, request: Request): Promise<void> {
    this.usersRegistrar.registerUserVisit(request);
    const { sub, preferred_username } = getSession(request);
    const list = await this.model.findByPk(listId, {
      include: ['guests', 'owner'],
    });
    if (!list || code !== list.inviteCode) throw listsExceptions.acceptInvite.notFound;
    await this.accessManager.grantGuestAccess(list, sub);
    Logger.log(
      `User '${preferred_username}' has accepted an invite to list '${list.id}'.`,
      ListsProvider.name,
    );
  }
}
