import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getSession, Mapper } from '@spuxx/nest-utils';
import { RecipeCreateResource } from '../dtos/recipe.create.resource';
import { UsersRegistrar } from '@src/users/services/users.registrar';
import { Request } from 'express';
import { FindOptions, Op } from 'sequelize';
import { RecipesAccessManager } from './recipes.access-manager';
import { recipesExceptions } from '../config/recipes.exceptions';
import { RecipeUpdateResource } from '../dtos/recipe.update.resource';
import { Recipe } from '../models/recipe.model';

@Injectable()
export class RecipesProvider {
  constructor(
    @InjectModel(Recipe) private model: typeof Recipe,
    private readonly accessManager: RecipesAccessManager,
    private readonly usersRegistrar: UsersRegistrar,
    private readonly mapper: Mapper,
  ) {}

  /**
   * Returns all of the user's recipes. Includes both owned recipes and recipes
   * that the user has guest access to.
   * @param request {@link Request}
   * @param options (optional) {@link FindOptions}
   * @returns All of the user's recipes.
   */
  async findMany(request: Request, options?: FindOptions<Recipe>): Promise<Recipe[]> {
    const { sub } = getSession(request);
    return this.model.findAll({
      ...options,
      where: {
        [Op.or]: [{ ownerId: sub }, { '$guests.id$': sub }],
      },
    });
  }

  /**
   * Returns a specific recipe by id.
   * @param id The id of the recipe.
   * @param request {@link Request}
   * @param options (optional) {@link FindOptions}
   * @returns The recipe.
   */
  async findById(id: string, request: Request, options?: FindOptions<Recipe>): Promise<Recipe> {
    const recipe = await this.model.findByPk(id, options);
    if (!recipe) throw recipesExceptions.findById.notFound;
    await this.accessManager.checkAccess(recipe, request);
    return recipe;
  }

  /**
   * Creates a new recipe. The recipe will be owned by the user who created it.
   * @param resource The resource.
   * @param request {@link Request}
   * @returns The newly created recipe.
   */
  async create(resource: RecipeCreateResource, request: Request): Promise<Recipe> {
    await this.usersRegistrar.registerUserVisit(request);
    const { sub, preferred_username } = getSession(request);
    const preSave: Recipe = this.mapper.map(resource, RecipeCreateResource, Recipe);
    preSave.set('ownerId', sub);
    const { id } = await preSave.save();
    const result = await this.findById(id, request);
    Logger.log(
      `User '${preferred_username}' has created recipe '${result.id}'.`,
      this.constructor.name,
    );
    return result;
  }

  /**
   * Updates a recipe. Only the owner may update a recipe.
   * @param id The id of the recipe.
   * @param resource The resource.
   * @param request {@link Request}
   * @param options (optional) {@link FindOptions}
   * @returns The updated recipe.
   */
  async update(
    id: string,
    resource: RecipeUpdateResource,
    request: Request,
    options?: FindOptions<Recipe>,
  ): Promise<Recipe> {
    const { preferred_username } = getSession(request);
    const recipe = await this.findById(id, request, {
      include: options.include,
    });
    this.accessManager.checkOwnership(recipe, request);
    for (const key in resource) {
      const value = resource[key as keyof typeof resource];
      if (value === undefined || value === null) continue;
      recipe.set(key, value);
    }
    const result = await recipe.save();
    Logger.log(
      `User '${preferred_username}' has updated recipe '${result.id}'.`,
      this.constructor.name,
    );
    return result;
  }

  /**
   * Deletes a recipe. Only the owner may delete a recipe.
   * @param id The if of the recipe.
   * @param request {@link Request}
   */
  async delete(id: string, request: Request): Promise<void> {
    const { preferred_username } = getSession(request);
    try {
      const recipe = await this.findById(id, request);
      this.accessManager.checkOwnership(recipe, request);
      await recipe.destroy();
      Logger.log(
        `User '${preferred_username}' has deleted recipe '${recipe.id}'.`,
        this.constructor.name,
      );
    } catch (error) {
      return;
    }
  }
}
