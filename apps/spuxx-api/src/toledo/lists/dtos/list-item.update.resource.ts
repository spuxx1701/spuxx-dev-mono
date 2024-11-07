import { ApiPropertyOptional } from '@nestjs/swagger';
import { Map, TransformBooleanString } from '@spuxx/nest-utils';
import { listItemProperties } from '../config/list-item.properties';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ListItemUpdateResource {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional(listItemProperties.text)
  @Map()
  text?: string;

  @IsNumber()
  @Min(1)
  @Max(99)
  @IsOptional()
  @ApiPropertyOptional(listItemProperties.quantity)
  @Map()
  quantity?: number;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional(listItemProperties.checked)
  @Map()
  checked?: boolean;
}
