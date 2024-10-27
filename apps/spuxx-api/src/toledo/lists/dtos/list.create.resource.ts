import { ApiProperty } from '@nestjs/swagger';
import { listPropertyDocs } from '../config/list.property-docs';
import { IsString, MaxLength } from 'class-validator';

export class ListCreateResource {
  @IsString()
  @MaxLength(100)
  @ApiProperty(listPropertyDocs.name)
  name: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty(listPropertyDocs.icon)
  icon?: string;
}
