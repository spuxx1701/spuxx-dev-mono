import { Body, Controller, Get, Param, Post, Req, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { defaultValidationPipe } from '@src/validation/default-validation.pipe';
import { AuthGuard, HttpLoggingInterceptor, Mapper, Roles } from '@spuxx/nest-utils';
import { AuthRole } from '@src/auth/auth.config';
import type { Request } from 'express';
import { ListReadResource } from '../dtos/list.read.resource';
import { ListsProvider } from '../services/lists.provider';
import { listPropertyDocs } from '../config/list.property-docs';
import { ListCreateResource } from '../dtos/list.create.resource';
import { List } from '../models/list.model';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { listsExceptions } from '../config/lists.exceptions';

const requiredRoles = [AuthRole.toledoUser];

@Controller('toledo/lists')
@ApiTags('Toledo - Lists')
@UsePipes(defaultValidationPipe)
@UseInterceptors(HttpLoggingInterceptor)
@UseGuards(AuthGuard)
@Roles(...requiredRoles)
export class ListsController {
  constructor(
    private readonly provider: ListsProvider,
    private mapper: Mapper,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Returns the user's lists.",
    description: `Returns all lists accessibly by the currently authenticated user.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiOkResponse({
    type: ListReadResource,
    isArray: true,
  })
  @ApiException(() => Object.values(listsExceptions.findMany))
  async findAll(@Req() request: Request): Promise<ListReadResource[]> {
    const lists = await this.provider.findAll(request);
    return lists.map((list) => this.mapper.map(list, List, ListReadResource));
  }

  @Get(':id')
  @ApiOperation({
    summary: "Returns the user's lists.",
    description: `Returns all lists accessibly by the currently authenticated user.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(listPropertyDocs.id)
  @ApiOkResponse({
    type: ListReadResource,
  })
  @ApiException(() => Object.values(listsExceptions.findById))
  async findById(@Param('id') id: string): Promise<ListReadResource> {
    const list = await this.provider.findById(id);
    return this.mapper.map(list, List, ListReadResource);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new list.',
    description: `Creates a new list owned by the currently authenticated user.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiOkResponse({
    status: 200,
    type: ListReadResource,
  })
  @ApiException(() => Object.values(listsExceptions.create))
  async create(@Body() resource: ListCreateResource, @Req() request: Request): Promise<ListReadResource> {
    const list = await this.provider.create(resource, request);
    return this.mapper.map(list, List, ListReadResource);
  }
}
