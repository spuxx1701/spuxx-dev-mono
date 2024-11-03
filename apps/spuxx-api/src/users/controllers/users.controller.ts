import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard, Mapper, Roles } from '@spuxx/nest-utils';
import { UserReadResource } from '../dtos/user.read.resource';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { usersExceptions } from '../config/users.exceptions';
import { UsersProvider } from '../services/users.provider';
import { User } from '../models/user.model';
import { userProperties } from '../config/users.properties';

@Controller('users')
@UseGuards(AuthGuard)
@Roles()
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly provider: UsersProvider,
    private readonly mapper: Mapper,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Returns the list of all users.',
    description: `Returns all users that are registered with the application.
    
    🔒 Application access`,
  })
  @ApiOkResponse({
    type: UserReadResource,
    isArray: true,
  })
  @ApiException(() => Object.values(usersExceptions.findMany))
  async findMany(): Promise<UserReadResource[]> {
    const users = await this.provider.findMany();
    return users.map((user) => this.mapper.map(user, User, UserReadResource));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Returns a user by its id.',
    description: `Finds and returns a user by its id.
    
    🔒 Application access`,
  })
  @ApiParam(userProperties.id)
  @ApiOkResponse({
    type: UserReadResource,
    isArray: true,
  })
  @ApiException(() => Object.values(usersExceptions.findById))
  async findById(@Param('id') id: string): Promise<UserReadResource> {
    const user = await this.provider.findById(id);
    return this.mapper.map(user, User, UserReadResource);
  }
}
