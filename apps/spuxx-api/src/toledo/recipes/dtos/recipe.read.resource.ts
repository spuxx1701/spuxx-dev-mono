import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Map } from '@spuxx/nest-utils';
import { recipeProperties } from '../config/recipe.properties';
import { UserReadResource } from '@src/users/dtos/user.read.resource';

export class RecipeReadResource {
  @Map()
  @ApiProperty(recipeProperties.id)
  id: string;

  @Map()
  @ApiProperty(recipeProperties.name)
  name: string;

  @Map()
  @ApiPropertyOptional(recipeProperties.icon)
  icon: string;

  @ApiPropertyOptional(recipeProperties.url)
  @Map()
  url?: string;

  @ApiPropertyOptional(recipeProperties.text)
  @Map()
  text?: string;

  @ApiProperty(recipeProperties.owner)
  @Map()
  owner: UserReadResource;

  @ApiProperty(recipeProperties.guests)
  @Map()
  guests: UserReadResource[];

  @Map()
  @ApiPropertyOptional(recipeProperties.createdAt)
  createdAt: Date;

  @Map()
  @ApiPropertyOptional(recipeProperties.updatedAt)
  updatedAt: Date;
}
