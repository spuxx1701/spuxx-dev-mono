import { ApiProperty } from '@nestjs/swagger';
import { Map } from '@spuxx/nest-utils';
import { listItemProperties } from '../config/list-item.properties';

export class ListItemReadResource {
  @ApiProperty(listItemProperties.id)
  @Map()
  id: string;

  @ApiProperty(listItemProperties.listId)
  @Map()
  listId: string;

  @ApiProperty(listItemProperties.text)
  @Map()
  text: string;

  @ApiProperty(listItemProperties.quantity)
  @Map()
  quantity: number;

  @ApiProperty(listItemProperties.checked)
  @Map()
  checked: boolean;

  @ApiProperty(listItemProperties.createdAt)
  @Map()
  createdAt: Date;

  @ApiProperty(listItemProperties.updatedAt)
  @Map()
  updatedAt: Date;
}
