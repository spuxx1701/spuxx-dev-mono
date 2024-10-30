import { ApiProperty } from '@nestjs/swagger';
import { listProperties } from '../config/list.properties';
import { Map } from '@spuxx/nest-utils';
import { UserReadResource } from '@spuxx-api/src/users/dtos/user.read.resource';

export class ListReadResource {
  @ApiProperty(listProperties.id)
  @Map()
  id: string;

  @ApiProperty(listProperties.name)
  @Map()
  name: string;

  @ApiProperty(listProperties.icon)
  @Map()
  icon: string;

  @ApiProperty(listProperties.owner)
  @Map()
  owner: UserReadResource;

  @ApiProperty(listProperties.usesCheckboxes)
  @Map()
  usesCheckboxes: boolean;

  @ApiProperty(listProperties.requiresDeleteConfirmation)
  @Map()
  requiresDeleteConfirmation: boolean;

  @ApiProperty(listProperties.usesQuantities)
  @Map()
  usesQuantities: boolean;

  @ApiProperty(listProperties.createdAt)
  @Map()
  createdAt: Date;

  @ApiProperty(listProperties.updatedAt)
  @Map()
  updatedAt: Date;
}
