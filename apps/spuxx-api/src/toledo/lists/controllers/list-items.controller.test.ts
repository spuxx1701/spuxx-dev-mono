import { Supertest, TestContainer } from '@spuxx/nest-testing';
import { ListsModule } from '../lists.module';
import { TestOrmModule } from '@tests/database/test-orm-module';
import { authConfig } from '@src/auth/auth.config';
import { listCreateMockData } from '@tests/mock-data/list.mock-data';
import { listItemCreateMockData } from '@tests/mock-data/list-item.mock-data';
import { sessionMockData } from '@tests/mock-data/session.mock-data';
import { ListItemReadResource } from '../dtos/list-item.read.resource';
import { ListItemCreateResource } from '../dtos/list-item.create.resource';
import { ListItemUpdateResource } from '../dtos/list-item.update.resource';
import { AuthModule } from '@spuxx/nest-utils';

describe('ListItemsController', () => {
  let supertest: Supertest;

  beforeEach(async () => {
    const container = await TestContainer.create({
      imports: [AuthModule.forRoot(authConfig), TestOrmModule, ListsModule],
      enableEndToEnd: true,
    });
    supertest = container.supertest;
  });

  describe('create', () => {
    it(
      'should successfully create two items',
      async () => {
        // Create a new empty list
        let response = await supertest.post('/toledo/lists', {
          body: listCreateMockData.groceries,
          session: sessionMockData.privileged,
        });
        expect(response.statusCode).toBe(201);
        const listId = response.body.id;
        response = await supertest.get(`/toledo/lists/${listId}?include=items`, {
          session: sessionMockData.privileged,
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.items).toEqual([]);

        // Add first item
        response = await supertest.post(`/toledo/lists/${listId}/items`, {
          body: listItemCreateMockData.apples,
          session: sessionMockData.privileged,
        });
        const firstItem: ListItemReadResource = response.body;
        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject(listItemCreateMockData.apples);
        response = await supertest.get(`/toledo/lists/${listId}?include=items`, {
          session: sessionMockData.privileged,
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.items).toEqual([firstItem]);

        // Add second item
        response = await supertest.post(`/toledo/lists/${listId}/items`, {
          body: listItemCreateMockData.bananas,
          session: sessionMockData.privileged,
        });
        const secondItem: ListItemReadResource = response.body;
        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject(listItemCreateMockData.bananas);
        response = await supertest.get(`/toledo/lists/${listId}?include=items`, {
          session: sessionMockData.privileged,
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.items).toEqual([firstItem, secondItem]);
      },
      {
        retry: 3,
      },
    );

    it('should use default values', async () => {
      // Create a new empty list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.toDos,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const listId = response.body.id;

      // Add first item
      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: listItemCreateMockData.writeTests,
        session: sessionMockData.privileged,
      });
      const firstItem: ListItemReadResource = response.body;
      expect(response.statusCode).toBe(201);
      expect(firstItem).toEqual({ ...firstItem, quantity: 1, checked: false });
    });

    it('should be able to create items on a list with guest access', async () => {
      // Create a new empty list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const listId = response.body.id;

      // Try to add the item without access
      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: listItemCreateMockData.apples,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);

      // Generate and accept the invite
      response = await supertest.post(`/toledo/lists/${listId}/generate-invite`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const { code }: { code: string } = response.body;
      response = await supertest.put(`/toledo/lists/${listId}/accept-invite?code=${code}`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);

      // Try to add item again
      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: listItemCreateMockData.apples,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
    });

    it('should fail input validation', async () => {
      // Create a new empty list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.toDos,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const listId = response.body.id;

      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: {
          text: '',
        } as ListItemCreateResource,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: {
          text: 'a'.repeat(256),
        } as ListItemCreateResource,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: {
          text: 'Apples',
          quantity: 'foo',
        } as unknown as ListItemCreateResource,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: {
          text: 'Apples',
          quantity: -1,
        } as ListItemCreateResource,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: {
          text: 'Apples',
          quantity: 9999999,
        } as ListItemCreateResource,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);
    });

    it('should return 401', async () => {
      const response = await supertest.post('/toledo/lists/123/items');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.post('/toledo/lists/123/items', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });

    it('should return 404 because the list does not exist', async () => {
      const response = await supertest.post('/toledo/lists/123/items', {
        body: listItemCreateMockData.apples,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(404);
    });

    it('should return 404 because the user does not have access to the list', async () => {
      // Create a new empty list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.toDos,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const listId = response.body.id;

      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: listItemCreateMockData.apples,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('update', () => {
    it('should successfully update a list item', async () => {
      // Create a new empty list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const listId = response.body.id;

      // Create a new list item
      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: listItemCreateMockData.apples,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const originalItem: ListItemReadResource = response.body;
      const itemId = originalItem.id;

      // Update text
      response = await supertest.patch(`/toledo/lists/${listId}/items/${itemId}`, {
        body: {
          text: 'Bananas',
        } as ListItemUpdateResource,
        session: sessionMockData.privileged,
      });
      let updatedItem: ListItemReadResource = response.body;
      expect(response.statusCode).toBe(200);
      expect(updatedItem).toEqual({
        ...originalItem,
        text: 'Bananas',
        updatedAt: updatedItem.updatedAt,
      });

      // Update quantity
      response = await supertest.patch(`/toledo/lists/${listId}/items/${itemId}`, {
        body: {
          quantity: 42,
        } as ListItemUpdateResource,
        session: sessionMockData.privileged,
      });
      updatedItem = response.body;
      expect(response.statusCode).toBe(200);
      expect(updatedItem).toEqual({
        ...originalItem,
        text: 'Bananas',
        quantity: 42,
        updatedAt: updatedItem.updatedAt,
      });

      // Update checked state
      response = await supertest.patch(`/toledo/lists/${listId}/items/${itemId}`, {
        body: {
          checked: true,
        } as ListItemUpdateResource,
        session: sessionMockData.privileged,
      });
      updatedItem = response.body;
      expect(response.statusCode).toBe(200);
      expect(updatedItem).toEqual({
        ...originalItem,
        text: 'Bananas',
        quantity: 42,
        checked: true,
        updatedAt: updatedItem.updatedAt,
      });

      // Revert back to original state
      response = await supertest.patch(`/toledo/lists/${listId}/items/${itemId}`, {
        body: originalItem,
        session: sessionMockData.privileged,
      });
      updatedItem = response.body;
      expect(response.statusCode).toBe(200);
      expect(updatedItem).toEqual({
        ...originalItem,
        updatedAt: updatedItem.updatedAt,
      });
    });

    it('should fail input validation', async () => {
      // Create a new empty list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.toDos,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const listId = response.body.id;

      // Create a new list item
      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: listItemCreateMockData.apples,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const itemId: string = response.body.id;

      response = await supertest.patch(`/toledo/lists/${listId}/items/${itemId}`, {
        body: {
          text: '',
        } as ListItemCreateResource,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.patch(`/toledo/lists/${listId}/items/${itemId}`, {
        body: {
          text: 'a'.repeat(256),
        } as ListItemCreateResource,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.patch(`/toledo/lists/${listId}/items/${itemId}`, {
        body: {
          quantity: 'foo',
        } as unknown as ListItemCreateResource,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.patch(`/toledo/lists/${listId}/items/${itemId}`, {
        body: {
          quantity: -1,
        } as ListItemCreateResource,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.patch(`/toledo/lists/${listId}/items/${itemId}`, {
        body: {
          quantity: 9999999,
        } as ListItemCreateResource,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);
    });

    it('should return 401', async () => {
      const response = await supertest.patch('/toledo/lists/123/items/123');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.patch('/toledo/lists/123/items/123', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });

    it('should return 404 if the list does not exist', async () => {
      const response = await supertest.patch(`/toledo/lists/123/items/123`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);
    });

    it('should return 404 if user does not have access to the list', async () => {
      // Create a new empty list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const listId = response.body.id;

      // Create list item
      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: listItemCreateMockData.apples,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const item: ListItemReadResource = response.body;

      // Attempt to delete the list item
      response = await supertest.delete(`/toledo/lists/${listId}/items/${item.id}`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('delete', () => {
    it('should successfully delete a list item', async () => {
      // Create a new empty list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const listId = response.body.id;

      // Create two new list items
      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: listItemCreateMockData.apples,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const firstItem: ListItemReadResource = response.body;
      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: listItemCreateMockData.bananas,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const secondItem: ListItemReadResource = response.body;

      // Verify list item number
      response = await supertest.get(`/toledo/lists/${listId}?include=items`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(2);

      // Delete first item
      response = await supertest.delete(`/toledo/lists/${listId}/items/${firstItem.id}`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      response = await supertest.get(`/toledo/lists/${listId}?include=items`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(1);

      // Delete second item
      response = await supertest.delete(`/toledo/lists/${listId}/items/${secondItem.id}`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      response = await supertest.get(`/toledo/lists/${listId}?include=items`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(0);
    });

    it('should return 200 if the list item does not exist', async () => {
      // Create a new empty list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const listId = response.body.id;

      // Delete non-existing item
      response = await supertest.delete(`/toledo/lists/${listId}/items/123`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
    });

    it('should return 401', async () => {
      const response = await supertest.delete('/toledo/lists/123/items/123');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.delete('/toledo/lists/123/items/123', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });

    it('should return 404 if the list does not exist', async () => {
      const response = await supertest.delete(`/toledo/lists/123/items/123`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);
    });

    it('should return 404 if user does not have access to the list', async () => {
      // Create a new empty list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const listId = response.body.id;

      // Create list item
      response = await supertest.post(`/toledo/lists/${listId}/items`, {
        body: listItemCreateMockData.apples,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const item: ListItemReadResource = response.body;

      // Attempt to delete the list item
      response = await supertest.delete(`/toledo/lists/${listId}/items/${item.id}`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);
    });
  });
});
