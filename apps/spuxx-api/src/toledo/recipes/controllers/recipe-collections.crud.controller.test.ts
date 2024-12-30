import { INestApplication } from '@nestjs/common';
import { Supertest, TestContainer } from '@spuxx/nest-testing';
import { AuthModule } from '@spuxx/nest-utils';
import { authConfig } from '@src/auth/auth.config';
import { TestOrmModule } from '@tests/database/test-orm-module';
import { RecipesModule } from '../recipes.module';
import { sessionMockData } from '@tests/mock-data';
import { recipeProperties } from '../config/recipe.properties';
import { recipeMockData } from '@tests/mock-data/recipe.mock-data';
import { RecipesAccessManager } from '../services/recipes.access-manager';
import { Recipe } from '../models/recipe.model';
import { RecipeReadResource } from '../dtos/recipe.read.resource';
import { RecipeCreateResource } from '../dtos/recipe.create.resource';
import { RecipeUpdateResource } from '../dtos/recipe.update.resource';

describe('RecipesCrudController', () => {
  let supertest: Supertest;
  let app: INestApplication;

  beforeEach(async () => {
    const container = await TestContainer.create({
      imports: [AuthModule.forRoot(authConfig), TestOrmModule, RecipesModule],
      enableEndToEnd: true,
    });
    supertest = container.supertest;
    app = container.app;
  });

  describe('findMany', () => {
    it('should return all recipes', async () => {
      await supertest.post('/toledo/recipes', {
        body: recipeMockData.withText,
        session: sessionMockData.toledo,
      });
      await supertest.post('/toledo/recipes', {
        body: recipeMockData.withUrl,
        session: sessionMockData.toledo,
      });
      const response = await supertest.get(`/toledo/recipes`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].owner).toBeDefined();
      expect(response.body[0].recipes).toBeUndefined();
      expect(response.body[0].guests).toEqual([]);
    });

    it('should not return foreign recipes', async () => {
      await supertest.post('/toledo/recipes', {
        body: recipeMockData.withText,
        session: sessionMockData.privileged,
      });
      await supertest.post('/toledo/recipes', {
        body: recipeMockData.withUrl,
        session: sessionMockData.toledo,
      });
      const response = await supertest.get(`/toledo/recipes`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
    });

    it('should also include shared recipes', async () => {
      const firstRecipe = (
        await supertest.post('/toledo/recipes', {
          body: recipeMockData.withText,
          session: sessionMockData.toledo,
        })
      ).body;
      const secondRecipe = (
        await supertest.post('/toledo/recipes', {
          body: recipeMockData.withUrl,
          session: sessionMockData.privileged,
        })
      ).body;

      // First response should not include second recipe since it hasn't been shared yet
      let response = await supertest.get(`/toledo/recipes`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toEqual(firstRecipe);

      // Now share the second recipe
      const accessManager = app.get(RecipesAccessManager);
      await accessManager.grantGuestAccess(
        {
          id: secondRecipe.id,
        } as Recipe,
        sessionMockData.toledo.sub,
      );

      // Second response should also include second recipe
      response = await supertest.get(`/toledo/recipes`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toEqual(firstRecipe);
      expect(response.body[1]).toEqual({ ...secondRecipe, guests: response.body[1].guests });

      // Requesting recipes with a totally different user should not include the shared list,
      // since recipes are only shared with specific users
      response = await supertest.get(`/toledo/recipes`, {
        session: sessionMockData.toledo_2,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(0);
    });

    // TODO: Fix when relations have been implemented
    // it('should include the specified relationships', async () => {
    //   await supertest.post('/toledo/recipes', {
    //     body: recipeMockData.withText,
    //     session: sessionMockData.privileged,
    //   });
    //   await supertest.post('/toledo/recipes', {
    //     body: recipeMockData.withUrl,
    //     session: sessionMockData.privileged,
    //   });
    //   const response = await supertest.get(`/toledo/recipes?include=recipes`, {
    //     session: sessionMockData.privileged,
    //   });
    //   expect(response.statusCode).toBe(200);
    //   expect(response.body.length).toBe(2);
    //   expect(response.body[0].recipes).toBeDefined();
    //   expect(response.body[1].recipes).toBeDefined();
    // });

    // it("should fail validation due to invalid 'include' parameter", async () => {
    //   const response = await supertest.get(`/toledo/recipes?include=foo`, {
    //     session: sessionMockData.privileged,
    //   });
    //   expect(response.statusCode).toBe(400);
    // });

    it('should return 401', async () => {
      const response = await supertest.get('/toledo/recipes');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.get('/toledo/recipes', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });
  });

  describe('create', () => {
    it('should create a recipe', async () => {
      const body = recipeMockData.full;
      const response = await supertest.post('/toledo/recipes', {
        body,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const result: RecipeReadResource = response.body;
      expect(result.id).toBeDefined();
      expect(result.owner.id).toBe(sessionMockData.toledo.sub);
      expect(result).toMatchObject({ ...body });
    });

    it('should use the default icon', async () => {
      const body = new RecipeCreateResource({ name: 'Default icon' });
      const response = await supertest.post('/toledo/recipes', {
        body,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const result: RecipeReadResource = response.body;
      expect(result).toMatchObject({
        ...body,
        icon: recipeProperties.icon.default,
        text: null,
        url: null,
      });
    });

    it('should register an unregistered user on recipe creation', async () => {
      let response = await supertest.get('/users', {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(0);
      const body = new RecipeCreateResource({ name: 'Hamburgers' });
      await supertest.post('/toledo/recipes', {
        body,
        session: sessionMockData.toledo,
      });
      response = await supertest.get('/users', {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].id).toBe(sessionMockData.toledo.sub);
    });

    it('should fail input validation', async () => {
      let response = await supertest.post('/toledo/recipes', {
        body: {
          name: '',
        } as RecipeCreateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.post('/toledo/recipes', {
        body: {
          name: 'a'.repeat(256),
        } as RecipeCreateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.post('/toledo/recipes', {
        body: {
          name: 'Apples',
          icon: '',
        } as RecipeCreateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.post('/toledo/recipes', {
        body: {
          name: 'Apples',
          icon: 'a'.repeat(256),
        } as RecipeCreateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);
    });

    it('should return 401', async () => {
      const response = await supertest.post('/toledo/recipes');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.post('/toledo/recipes', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });
  });

  describe('findById', () => {
    it('should return the specific recipe', async () => {
      const createResponse = await supertest.post('/toledo/recipes', {
        body: recipeMockData.withText,
        session: sessionMockData.privileged,
      });
      const expected: RecipeReadResource = createResponse.body;
      await supertest.post('/toledo/recipes', {
        body: recipeMockData.withUrl,
        session: sessionMockData.privileged,
      });
      const response = await supertest.get(`/toledo/recipes/${expected.id}`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(200);
      const actual: RecipeReadResource = response.body;
      expect(expected.id).toBe(actual.id);
      expect(expected.name).toBe(actual.name);
      expect(expected.icon).toBe(actual.icon);
      expect(expected.owner.id).toBe(actual.owner.id);
      expect(actual.guests).toEqual([]);
    });

    it('should return the specific recipe after guest access has been granted', async () => {
      const recipe: RecipeReadResource = (
        await supertest.post('/toledo/recipes', {
          body: recipeMockData.withText,
          session: sessionMockData.privileged,
        })
      ).body;
      // Create another recipe for our user to get them registered
      await supertest.post('/toledo/recipes', {
        body: recipeMockData.withUrl,
        session: sessionMockData.toledo,
      });

      // First response should return 404 since the recipe hasn't been shared yet
      let response = await supertest.get(`/toledo/recipes/${recipe.id}`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);

      // Now share the second recipe
      const accessManager = app.get(RecipesAccessManager);
      await accessManager.grantGuestAccess(
        {
          id: recipe.id,
        } as Recipe,
        sessionMockData.toledo.sub,
      );

      // Second response should return 200
      response = await supertest.get(`/toledo/recipes/${recipe.id}`, {
        session: sessionMockData.toledo,
      });
      const actual: RecipeReadResource = recipe;
      expect(response.statusCode).toBe(200);
      expect(actual).toEqual({ ...recipe, guests: actual.guests });
    });

    // TODO: Reimplement when include is supported
    // it('should include the specified relationships', async () => {
    //   const createResponse = await supertest.post('/toledo/recipes', {
    //     body: recipeMockData.withText,
    //     session: sessionMockData.privileged,
    //   });
    //   const response = await supertest.get(
    //     `/toledo/recipes/${createResponse.body.id}?include=recipes`,
    //     {
    //       session: sessionMockData.privileged,
    //     },
    //   );
    //   expect(response.statusCode).toBe(200);
    //   expect(response.body.guests).toBeDefined();
    //   expect(response.body.recipes).toBeDefined();
    // });

    // TODO: Reimplement when include is supported
    // it("should fail validation due to invalid 'include' parameter", async () => {
    //   const createResponse = await supertest.post('/toledo/recipes', {
    //     body: recipeMockData.withText,
    //     session: sessionMockData.privileged,
    //   });
    //   const response = await supertest.get(
    //     `/toledo/recipes/${createResponse.body.id}?include=foo`,
    //     {
    //       session: sessionMockData.privileged,
    //     },
    //   );
    //   expect(response.statusCode).toBe(400);
    // });

    it('should return 401', async () => {
      const response = await supertest.get('/toledo/recipes/123');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.get('/toledo/recipes/123', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });

    it('should return 404 because the resource does not exist', async () => {
      const response = await supertest.get(`/toledo/recipes/123`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(404);
    });

    it('should return 404 because the user does not have access to the recipe', async () => {
      const createResponse = await supertest.post('/toledo/recipes', {
        body: recipeMockData.withText,
        session: sessionMockData.toledo,
      });
      const id = createResponse.body.id;
      const response = await supertest.get(`/toledo/recipes/${id}`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('update', () => {
    it('should successfully update a recipe', async () => {
      // Create a new recipe
      let response = await supertest.post('/toledo/recipes', {
        body: recipeMockData.withText,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const originalRecipe: RecipeReadResource = response.body;
      const { id } = originalRecipe;

      // Update name
      response = await supertest.patch(`/toledo/recipes/${id}`, {
        body: {
          name: 'Vegetarian',
        } as RecipeUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      let updatedRecipe: RecipeReadResource = response.body;
      expect(updatedRecipe).toEqual({
        ...originalRecipe,
        name: 'Vegetarian',
        updatedAt: updatedRecipe.updatedAt,
      });

      // Update icon
      response = await supertest.patch(`/toledo/recipes/${id}`, {
        body: {
          icon: 'carrot',
        } as RecipeUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      updatedRecipe = response.body;
      expect(updatedRecipe).toEqual({
        ...originalRecipe,
        name: 'Vegetarian',
        icon: 'carrot',
        updatedAt: updatedRecipe.updatedAt,
      });

      expect(response.statusCode).toBe(200);
      updatedRecipe = response.body;
      expect(updatedRecipe).toEqual({
        ...originalRecipe,
        name: 'Vegetarian',
        icon: 'carrot',
        updatedAt: updatedRecipe.updatedAt,
      });

      // Revert to original state
      response = await supertest.patch(`/toledo/recipes/${id}`, {
        body: {
          ...recipeMockData.withText,
          requiresDeleteConfirmation: false,
        } as RecipeUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      updatedRecipe = response.body;
      expect(updatedRecipe).toEqual({
        ...originalRecipe,
        updatedAt: updatedRecipe.updatedAt,
      });
    });

    it('should fail input validation', async () => {
      let response = await supertest.post('/toledo/recipes', {
        body: recipeMockData.withText,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const originalRecipe: RecipeReadResource = response.body;
      const { id } = originalRecipe;

      response = await supertest.patch(`/toledo/recipes/${id}`, {
        body: {
          name: '',
        } as RecipeUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.patch(`/toledo/recipes/${id}`, {
        body: {
          name: 'a'.repeat(256),
        } as RecipeUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.patch(`/toledo/recipes/${id}`, {
        body: {
          icon: '',
        } as RecipeUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.patch(`/toledo/recipes/${id}`, {
        body: {
          icon: 'a'.repeat(256),
        } as RecipeUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);
    });

    it('should return 401', async () => {
      const response = await supertest.patch('/toledo/recipes/123');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.patch('/toledo/recipes/123', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });

    it('should return 404 if recipe does not exist', async () => {
      const response = await supertest.patch('/toledo/recipes/123', {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);
    });

    it('should return 404 if the user does not have access to the recipe', async () => {
      let response = await supertest.post('/toledo/recipes', {
        body: recipeMockData.withText,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const { id } = response.body;

      response = await supertest.patch(`/toledo/recipes/${id}`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('delete', () => {
    it('should successfully delete the list', async () => {
      let response = await supertest.post('/toledo/recipes', {
        body: recipeMockData.withText,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const { id } = response.body;

      response = await supertest.delete(`/toledo/recipes/${id}`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
    });

    it('should return 200 for a non-existing list', async () => {
      const response = await supertest.delete(`/toledo/recipes/123`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
    });

    it('should return 401', async () => {
      const response = await supertest.delete('/toledo/recipes/123');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.delete('/toledo/recipes/123', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });
  });
});
