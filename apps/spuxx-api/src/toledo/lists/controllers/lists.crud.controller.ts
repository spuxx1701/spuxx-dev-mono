import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { defaultValidationPipe } from '@src/validation/default-validation.pipe';
import { AuthGuard, HttpLoggingInterceptor, Mapper, Roles } from '@spuxx/nest-utils';
import { AuthRole } from '@src/auth/auth.config';
import type { Request } from 'express';
import { ListReadResource } from '../dtos/list.read.resource';
import { ListsProvider } from '../services/lists.provider';
import { listProperties } from '../config/list.properties';
import { ListCreateResource } from '../dtos/list.create.resource';
import { List } from '../models/list.model';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { listsExceptions } from '../config/lists.exceptions';
import { ListUpdateResource } from '../dtos/list.update.resource';
import { ListsFindManyQuery } from './queries/lists.find-many.query';
import { transformQueryToFindOptions } from '@spuxx-api/src/orm/orm.utils';

const requiredRoles = [AuthRole.toledo];

@Controller('toledo/lists')
@ApiTags('Toledo - Lists')
@UsePipes(defaultValidationPipe)
@UseInterceptors(HttpLoggingInterceptor)
@UseGuards(AuthGuard)
@Roles(...requiredRoles)
export class ListsCrudController {
  constructor(
    private readonly provider: ListsProvider,
    private mapper: Mapper,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Get all of the user's lists.",
    description: `Returns all lists accessibly by the currently authenticated user.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiOkResponse({
    type: ListReadResource,
    isArray: true,
  })
  @ApiException(() => Object.values(listsExceptions.findMany))
  async findMany(
    @Query() query: ListsFindManyQuery,
    @Req() request: Request,
  ): Promise<ListReadResource[]> {
    const lists = await this.provider.findMany(request, transformQueryToFindOptions(query));
    return lists.map((list) => this.mapper.map(list, List, ListReadResource));
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new list.',
    description: `Creates a new list owned by the currently authenticated user.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiOkResponse({
    status: 201,
    type: ListReadResource,
  })
  @ApiException(() => Object.values(listsExceptions.create))
  async create(
    @Body() resource: ListCreateResource,
    @Req() request: Request,
  ): Promise<ListReadResource> {
    const list = await this.provider.create(resource, request);
    return this.mapper.map(list, List, ListReadResource);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a list by id.',
    description: `Finds and returns a specific list by the given id.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(listProperties.id)
  @ApiOkResponse({
    type: ListReadResource,
  })
  @ApiException(() => Object.values(listsExceptions.findById))
  async findById(
    @Param('id') id: string,
    @Query() query: ListsFindManyQuery,
    @Req() request: Request,
  ): Promise<ListReadResource> {
    const list = await this.provider.findById(id, request, transformQueryToFindOptions(query));
    return this.mapper.map(list, List, ListReadResource);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a list.',
    description: `Updates a list. Can only be done by the list's owner.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(listProperties.id)
  @ApiOkResponse({
    type: ListReadResource,
  })
  @ApiException(() => Object.values(listsExceptions.update))
  async update(
    @Param('id') id: string,
    @Body() resource: ListUpdateResource,
    @Req() request: Request,
  ): Promise<ListReadResource> {
    const list = await this.provider.update(id, resource, request);
    return this.mapper.map(list, List, ListReadResource);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a list.',
    description: `Deletes a list. Can only be done by the list's owner.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(listProperties.id)
  @ApiOkResponse()
  @ApiException(() => Object.values(listsExceptions.delete))
  async delete(@Param('id') id: string, @Req() request: Request): Promise<void> {
    return this.provider.delete(id, request);
  }
}
