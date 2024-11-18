import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Controller,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthRole } from '@spuxx-api/src/auth/auth.config';
import { InviteLinkResource } from '@spuxx-api/src/utils/invite-links/invite-link.resource';
import { defaultValidationPipe } from '@spuxx-api/src/validation/default-validation.pipe';
import { AuthGuard, HttpLoggingInterceptor, Roles } from '@spuxx/nest-utils';
import { type Request } from 'express';
import { listProperties } from '../config/list.properties';
import { listsExceptions } from '../config/lists.exceptions';
import { ListsInviteManager } from '../services/lists.invite-manager';
import { AcceptInviteQuery } from '@spuxx-api/src/utils/invite-links/accept-invite.query';

const requiredRoles = [AuthRole.toledo];

@Controller('toledo/lists')
@ApiTags('Toledo - Lists')
@UsePipes(defaultValidationPipe)
@UseInterceptors(HttpLoggingInterceptor)
@UseGuards(AuthGuard)
@Roles(...requiredRoles)
export class ListsActionsController {
  constructor(private readonly inviteManager: ListsInviteManager) {}

  @Post(':id/generate-invite')
  @ApiOperation({
    summary: 'Create a new invite for the list.',
    description: `Create a new invite link for the list using a randomly generated code.
    The invite link will be valid until a new invite link is generated.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(listProperties.id)
  @ApiOkResponse({
    type: InviteLinkResource,
    description: 'The generated invite link.',
  })
  @ApiException(() => Object.values(listsExceptions.generateInvite))
  async generateInvite(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<InviteLinkResource> {
    return this.inviteManager.generateInvite(id, request);
  }

  @Put(':id/accept-invite')
  @ApiOperation({
    summary: 'Accepts an invite to a list.',
    description: `Accepts an invite to a list. The invite link must be valid.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(listProperties.id)
  @ApiOkResponse({
    description: 'The invite was accepted.',
  })
  @ApiException(() => Object.values(listsExceptions.acceptInvite))
  async acceptInvite(
    @Param('id') id: string,
    @Query() query: AcceptInviteQuery,
    @Req() request: Request,
  ): Promise<void> {
    return this.inviteManager.acceptInvite(id, query.code, request);
  }
}
