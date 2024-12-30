import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { Map } from '@spuxx/nest-utils';
import { recipeProperties } from '../config/recipe.properties';

export class RecipeUpdateResource {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  @Map()
  @ApiPropertyOptional(recipeProperties.name)
  name?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  @Map()
  @ApiPropertyOptional(recipeProperties.icon)
  icon?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(1023)
  @IsOptional()
  @Map()
  @ApiPropertyOptional(recipeProperties.text)
  text?: string;

  @IsUrl()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  @Map()
  @ApiPropertyOptional(recipeProperties.url)
  url?: string;
}
