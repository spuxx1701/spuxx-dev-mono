import { ApiProperty } from '@nestjs/swagger';
import { listPropertyDocs } from '../config/list.property-docs';
import { Map } from '@spuxx/nest-utils';

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
  ownerId: string;

  @Map()
  createdAt: Date;

  @Map()
  updatedAt: Date;
}
