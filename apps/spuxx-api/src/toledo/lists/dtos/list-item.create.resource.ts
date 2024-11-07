import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Map } from '@spuxx/nest-utils';
import { listItemProperties } from '../config/list-item.properties';

export class ListItemCreateResource {
  @ApiProperty(listItemProperties.text)
  @Map()
  text: string;

  @ApiPropertyOptional(listItemProperties.quantity)
  @Map()
  quantity: number = listItemProperties.quantity.default;

  @ApiPropertyOptional(listItemProperties.checked)
  @Map()
  checked: boolean = listItemProperties.checked.default;
}
