import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthRole } from '@src/auth/auth.config';
import { defaultValidationPipe } from '@src/validation/default-validation.pipe';
import { AuthGuard, HttpLoggingInterceptor, Mapper, Roles } from '@spuxx/nest-utils';
import { ListItemReadResource } from '../dtos/list-item.read.resource';
import { ListItemCreateResource } from '../dtos/list-item.create.resource';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { listItemsExceptions } from '../config/list-items.exceptions';
import { ListItemsProvider } from '../services/list-items.provider';
import { ListItem } from '../models/list-item.model';
import { type Request } from 'express';
import { listItemProperties } from '../config/list-item.properties';
import { ListItemUpdateResource } from '../dtos/list-item.update.resource';

const requiredRoles = [AuthRole.toledo];

@Controller('toledo/lists')
@ApiTags('Toledo - Lists')
@UsePipes(defaultValidationPipe)
@UseInterceptors(HttpLoggingInterceptor)
@UseGuards(AuthGuard)
@Roles(...requiredRoles)
export class ListItemsController {
  constructor(
    private readonly provider: ListItemsProvider,
    private readonly mapper: Mapper,
  ) {}

  @Post(':listId/items')
  @ApiOperation({
    summary: 'Create a new list item.',
    description: `Creates a new list item on the specified list.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(listItemProperties.listId)
  @ApiOkResponse({
    description: 'The created list item.',
    type: ListItemReadResource,
  })
  @ApiException(() => Object.values(listItemsExceptions.create))
  async create(
    @Param('listId') listId: string,
    @Body() resource: ListItemCreateResource,
    @Req() request: Request,
  ): Promise<ListItemReadResource> {
    const list = await this.provider.create(listId, resource, request);
    return this.mapper.map(list, ListItem, ListItemReadResource);
  }

  @Patch(':listId/items/:itemId')
  @ApiOperation({
    summary: 'Update a list item.',
    description: `Updates the specified list item.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(listItemProperties.listId)
  @ApiOkResponse({
    description: 'The updated list item.',
    type: ListItemReadResource,
  })
  @ApiException(() => Object.values(listItemsExceptions.update))
  async update(
    @Param('listId') listId: string,
    @Param('itemId') itemId: string,
    @Body() resource: ListItemUpdateResource,
    @Req() request: Request,
  ): Promise<ListItemReadResource> {
    const list = await this.provider.update(listId, itemId, resource, request);
    return this.mapper.map(list, ListItem, ListItemReadResource);
  }

  @Delete(':listId/items/:itemId')
  @ApiOperation({
    summary: 'Delete a list item.',
    description: `Deletes the specified list item.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(listItemProperties.listId)
  @ApiOkResponse({
    description: 'The list item was deleted.',
  })
  @ApiException(() => Object.values(listItemsExceptions.delete))
  async delete(
    @Param('listId') listId: string,
    @Param('itemId') itemId: string,
    @Req() request: Request,
  ): Promise<void> {
    return this.provider.delete(listId, itemId, request);
  }
}
