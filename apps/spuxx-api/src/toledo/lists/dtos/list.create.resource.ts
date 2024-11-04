import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { listProperties } from '../config/list.properties';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Map, TransformBooleanString } from '@spuxx/nest-utils';

export class ListCreateResource {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Map()
  @ApiProperty(listProperties.name)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  @Map()
  @ApiPropertyOptional(listProperties.icon)
  icon: string = listProperties.icon.default;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  @Map()
  @ApiPropertyOptional(listProperties.usesCheckboxes)
  usesCheckboxes: boolean = listProperties.usesCheckboxes.default;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  @Map()
  @ApiPropertyOptional(listProperties.requiresDeleteConfirmation)
  requiresDeleteConfirmation: boolean = listProperties.requiresDeleteConfirmation.default;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  @Map()
  @ApiPropertyOptional(listProperties.usesQuantities)
  usesQuantities: boolean = listProperties.usesQuantities.default;

  constructor(init?: Partial<ListCreateResource>) {
    Object.assign(this, init);
  }
}
