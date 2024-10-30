import { ApiPropertyOptional } from '@nestjs/swagger';
import { listProperties } from '../config/list.properties';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { TransformBooleanString } from '@spuxx/nest-utils';

export class ListUpdateResource {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  @ApiPropertyOptional(listProperties.name)
  name?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  @ApiPropertyOptional(listProperties.icon)
  icon?: string;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional(listProperties.usesCheckboxes)
  usesCheckboxes?: boolean;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional(listProperties.requiresDeleteConfirmation)
  requiresDeleteConfirmation?: boolean;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional(listProperties.usesQuantities)
  usesQuantities?: boolean;
}
