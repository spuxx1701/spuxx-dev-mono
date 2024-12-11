import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { listProperties } from '../config/list.properties';
import { Map } from '@spuxx/nest-utils';
import { UserReadResource } from '@src/users/dtos/user.read.resource';
import { ListItemReadResource } from './list-item.read.resource';

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

  @ApiPropertyOptional(listProperties.guests)
  @Map()
  guests?: UserReadResource[];

  @ApiProperty(listProperties.usesCheckboxes)
  @Map()
  usesCheckboxes: boolean;

  @ApiProperty(listProperties.requiresDeleteConfirmation)
  @Map()
  requiresDeleteConfirmation: boolean;

  @ApiProperty(listProperties.usesQuantities)
  @Map()
  usesQuantities: boolean;

  @ApiPropertyOptional(listProperties.items)
  @Map()
  items: ListItemReadResource[];

  @ApiProperty(listProperties.createdAt)
  @Map()
  createdAt: Date;

  @ApiProperty(listProperties.updatedAt)
  @Map()
  updatedAt: Date;
}
