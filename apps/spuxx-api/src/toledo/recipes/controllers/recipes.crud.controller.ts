import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard, HttpLoggingInterceptor, Mapper, Roles } from '@spuxx/nest-utils';
import { AuthRole } from '@src/auth/auth.config';
import { defaultValidationPipe } from '@src/validation/default-validation.pipe';
import { RecipesProvider } from '../services/recipes.provider';
import { RecipeReadResource } from '../dtos/recipe.read.resource';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { recipesExceptions } from '../config/recipes.exceptions';
import { RecipesFindByIdQuery, RecipesFindManyQuery, RecipesUpdateQuery } from './queries';
import { type Request } from 'express';
import { transformQueryToFindOptions } from '@src/orm/orm.utils';
import { RecipeCreateResource } from '../dtos/recipe.create.resource';
import { recipeProperties } from '../config/recipe.properties';
import { RecipeUpdateResource } from '../dtos/recipe.update.resource';
import { Recipe } from '../models/recipe.model';

const requiredRoles = [AuthRole.toledo];

@Controller('toledo/recipes')
@ApiTags('Toledo - Recipes')
@UsePipes(defaultValidationPipe)
@UseInterceptors(HttpLoggingInterceptor)
@UseGuards(AuthGuard)
@Roles(...requiredRoles)
export class RecipesCrudController {
  constructor(
    private readonly provider: RecipesProvider,
    private readonly mapper: Mapper,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Get all of the user's recipes.",
    description: `Returns all recipes accessible by the currently authenticated user.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiOkResponse({
    type: RecipeReadResource,
    isArray: true,
    description: 'The recipes.',
  })
  @ApiException(() => Object.values(recipesExceptions.findMany))
  async findMany(
    @Query() query: RecipesFindManyQuery,
    @Req() request: Request,
  ): Promise<RecipeReadResource[]> {
    const recipes = await this.provider.findMany(request, transformQueryToFindOptions(query));
    return recipes.map((recipe) => this.mapper.map(recipe, Recipe, RecipeReadResource));
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new recipe.',
    description: `Creates a new recipe owned by the currently authenticated user.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiOkResponse({
    type: RecipeReadResource,
    description: 'The created recipe.',
  })
  @ApiException(() => Object.values(recipesExceptions.create))
  async create(
    @Body() resource: RecipeCreateResource,
    @Req() request: Request,
  ): Promise<RecipeReadResource> {
    const recipe = await this.provider.create(resource, request);
    return this.mapper.map(recipe, Recipe, RecipeReadResource);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a recipe by id.',
    description: `Finds and returns a specific recipe by the given id.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(recipeProperties.id)
  @ApiOkResponse({
    type: RecipeReadResource,
    description: 'The recipe.',
  })
  @ApiException(() => Object.values(recipesExceptions.findById))
  async findById(
    @Param('id') id: string,
    @Query() query: RecipesFindByIdQuery,
    @Req() request: Request,
  ): Promise<RecipeReadResource> {
    const recipe = await this.provider.findById(id, request, transformQueryToFindOptions(query));
    return this.mapper.map(recipe, Recipe, RecipeReadResource);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a recipe.',
    description: `Updates a recipe. Can only be done by the recipe's owner.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(recipeProperties.id)
  @ApiOkResponse({
    type: RecipeReadResource,
    description: 'The updated recipe.',
  })
  @ApiException(() => Object.values(recipesExceptions.update))
  async update(
    @Param('id') id: string,
    @Query() query: RecipesUpdateQuery,
    @Body() resource: RecipeUpdateResource,
    @Req() request: Request,
  ): Promise<RecipeReadResource> {
    const recipe = await this.provider.update(
      id,
      resource,
      request,
      transformQueryToFindOptions(query),
    );
    return this.mapper.map(recipe, Recipe, RecipeReadResource);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a recipe.',
    description: `Deletes a recipe. Can only be done by the recipe's owner.
    
    🔒 Role access (${requiredRoles})`,
  })
  @ApiParam(recipeProperties.id)
  @ApiOkResponse({
    description: 'The recipe has been deleted.',
  })
  @ApiException(() => Object.values(recipesExceptions.delete))
  async delete(@Param('id') id: string, @Req() request: Request): Promise<void> {
    return this.provider.delete(id, request);
  }
}
