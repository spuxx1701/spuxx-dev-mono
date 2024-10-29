import { ApiProperty } from '@nestjs/swagger';
import { listPropertyDocs } from '../config/list.property-docs';
import { Map } from '@spuxx/nest-utils';
import { UserReadResource } from '@spuxx-api/src/users/dtos/user.read.resource';

export class ListReadResource {
  @ApiProperty(listPropertyDocs.id)
  @Map()
  id: string;

  @ApiProperty(listPropertyDocs.name)
  @Map()
  name: string;

  @ApiProperty(listPropertyDocs.icon)
  @Map()
  icon: string;

  @ApiProperty(listPropertyDocs.owner)
  @Map()
  owner: UserReadResource;

  @Map()
  createdAt: Date;

  @Map()
  updatedAt: Date;
}
