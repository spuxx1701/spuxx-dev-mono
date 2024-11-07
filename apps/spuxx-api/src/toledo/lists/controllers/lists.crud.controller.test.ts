import { Supertest, TestContainer } from '@spuxx/nest-utils';
import { ListsModule } from '../lists.module';
import { TestOrmModule } from '@tests/database/test-orm-module';
import { authConfig } from '@src/auth/auth.config';
import { listCreateMockData } from '@mock-data/list.mock-data';
import { sessionMockData } from '@mock-data/session.mock-data';
import { ListReadResource } from '../dtos/list.read.resource';
import { ListCreateResource } from '../dtos/list.create.resource';
import { ListUpdateResource } from '../dtos/list.update.resource';

describe('ListsCrudController', () => {
  let supertest: Supertest;

  beforeEach(async () => {
    const container = await TestContainer.create({
      imports: [TestOrmModule, ListsModule],
      enableEndToEnd: true,
      authOptions: { ...authConfig },
    });
    supertest = container.supertest;
  });

  describe('findMany', () => {
    it('should return all lists', async () => {
      await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      await supertest.post('/toledo/lists', {
        body: listCreateMockData.toDos,
        session: sessionMockData.privileged,
      });
      const response = await supertest.get(`/toledo/lists`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].owner).toBeDefined();
      expect(response.body[0].items).toBeUndefined();
      expect(response.body[0].guests).toBeUndefined();
    });

    it('should include the specified relationships', async () => {
      await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      await supertest.post('/toledo/lists', {
        body: listCreateMockData.toDos,
        session: sessionMockData.privileged,
      });
      const response = await supertest.get(`/toledo/lists?include=items,guests`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].guests).toBeDefined();
      expect(response.body[0].items).toBeDefined();
      expect(response.body[1].guests).toBeDefined();
      expect(response.body[1].items).toBeDefined();
    });

    it("should fail validation due to invalid 'include' parameter", async () => {
      const response = await supertest.get(`/toledo/lists?include=foo`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);
    });

    it('should return 401', async () => {
      const response = await supertest.get('/toledo/lists');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.get('/toledo/lists', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });
  });

  describe('findById', () => {
    it('should return the specific list', async () => {
      const createResponse = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      const expected: ListReadResource = createResponse.body;
      await supertest.post('/toledo/lists', {
        body: listCreateMockData.toDos,
        session: sessionMockData.privileged,
      });
      const response = await supertest.get(`/toledo/lists/${expected.id}`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(200);
      const actual: ListReadResource = response.body;
      expect(expected.id).toBe(actual.id);
      expect(expected.name).toBe(actual.name);
      expect(expected.icon).toBe(actual.icon);
      expect(expected.owner.id).toBe(actual.owner.id);
      expect(actual.guests).toBeUndefined();
      expect(actual.items).toBeUndefined();
    });

    it('should include the specified relationships', async () => {
      const createResponse = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      const response = await supertest.get(
        `/toledo/lists/${createResponse.body.id}?include=guests,items`,
        {
          session: sessionMockData.privileged,
        },
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.guests).toBeDefined();
      expect(response.body.items).toBeDefined();
    });

    it("should fail validation due to invalid 'include' parameter", async () => {
      const createResponse = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      const response = await supertest.get(`/toledo/lists/${createResponse.body.id}?include=foo`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(400);
    });

    it('should return 401', async () => {
      const response = await supertest.get('/toledo/lists/123');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.get('/toledo/lists/123', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });

    it('should return 404 because the resource does not exist', async () => {
      const response = await supertest.get(`/toledo/lists/123`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(404);
    });

    it('should return 404 because the user does not have access to the list', async () => {
      const createResponse = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.toledo,
      });
      const id = createResponse.body.id;
      const response = await supertest.get(`/toledo/lists/${id}`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('create', () => {
    it('should successfully create a new list', async () => {
      const body = listCreateMockData.groceries;
      const response = await supertest.post('/toledo/lists', {
        body,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const result: ListReadResource = response.body;
      expect(result.id).toBeDefined();
      expect(result.owner.id).toBe(sessionMockData.privileged.sub);
      expect(result).toMatchObject(body);
    });

    it('should use default values', async () => {
      const body = new ListCreateResource({ name: 'groceries' });
      const response = await supertest.post('/toledo/lists', {
        body,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const result: ListReadResource = response.body;
      expect(result).toMatchObject({
        name: 'groceries',
        icon: 'list-box',
        requiresDeleteConfirmation: false,
        usesQuantities: false,
      });
    });

    it('should register an unregistered user on list creation', async () => {
      let response = await supertest.get('/users', {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(0);
      const body = new ListCreateResource({ name: 'groceries' });
      await supertest.post('/toledo/lists', {
        body,
        session: sessionMockData.privileged,
      });
      response = await supertest.get('/users', {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].id).toBe(sessionMockData.privileged.sub);
    });

    it('should fail input validation', async () => {
      let response = await supertest.post('/toledo/lists', {
        body: {
          name: '',
        } as ListCreateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.post('/toledo/lists', {
        body: {
          name: 'a'.repeat(256),
        } as ListCreateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.post('/toledo/lists', {
        body: {
          name: 'Apples',
          icon: '',
        } as ListCreateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.post('/toledo/lists', {
        body: {
          name: 'Apples',
          icon: 'a'.repeat(256),
        } as ListCreateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);
    });

    it('should return 401', async () => {
      const response = await supertest.post('/toledo/lists');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.post('/toledo/lists', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });
  });

  describe('update', () => {
    it('should successfully update a list', async () => {
      // Create a new list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const originalList: ListReadResource = response.body;
      const { id } = originalList;

      // Update name
      response = await supertest.patch(`/toledo/lists/${id}`, {
        body: {
          name: 'Food',
        } as ListUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      let updatedList: ListReadResource = response.body;
      expect(updatedList).toEqual({
        ...originalList,
        name: 'Food',
        updatedAt: updatedList.updatedAt,
      });

      // Update icon
      response = await supertest.patch(`/toledo/lists/${id}`, {
        body: {
          icon: 'food',
        } as ListUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      updatedList = response.body;
      expect(updatedList).toEqual({
        ...originalList,
        name: 'Food',
        icon: 'food',
        updatedAt: updatedList.updatedAt,
      });

      // Toggle all flags
      response = await supertest.patch(`/toledo/lists/${id}`, {
        body: {
          requiresDeleteConfirmation: true,
          usesCheckboxes: false,
          usesQuantities: false,
        } as ListUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      updatedList = response.body;
      expect(updatedList).toEqual({
        ...originalList,
        name: 'Food',
        icon: 'food',
        requiresDeleteConfirmation: true,
        usesCheckboxes: false,
        usesQuantities: false,
        updatedAt: updatedList.updatedAt,
      });

      // Revert to original state
      response = await supertest.patch(`/toledo/lists/${id}`, {
        body: {
          ...listCreateMockData.groceries,
          requiresDeleteConfirmation: false,
        } as ListUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
      updatedList = response.body;
      expect(updatedList).toEqual({
        ...originalList,
        updatedAt: updatedList.updatedAt,
      });
    });

    it('should fail input validation', async () => {
      // Create a new list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const originalList: ListReadResource = response.body;
      const { id } = originalList;

      response = await supertest.patch(`/toledo/lists/${id}`, {
        body: {
          name: '',
        } as ListUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.patch(`/toledo/lists/${id}`, {
        body: {
          name: 'a'.repeat(256),
        } as ListUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.patch(`/toledo/lists/${id}`, {
        body: {
          icon: '',
        } as ListUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);

      response = await supertest.patch(`/toledo/lists/${id}`, {
        body: {
          icon: 'a'.repeat(256),
        } as ListUpdateResource,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(400);
    });

    it('should return 401', async () => {
      const response = await supertest.patch('/toledo/lists/123');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.patch('/toledo/lists/123', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });

    it('should return 404 if list does not exist', async () => {
      const response = await supertest.patch('/toledo/lists/123', {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);
    });

    it('should return 404 if the user does not have access to the list', async () => {
      // Create a new list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const { id } = response.body;

      response = await supertest.patch(`/toledo/lists/${id}`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('delete', () => {
    it('should successfully delete the list', async () => {
      // Create a new list
      let response = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(201);
      const { id } = response.body;

      response = await supertest.delete(`/toledo/lists/${id}`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
    });

    it('should return 200 for a non-existing list', async () => {
      const response = await supertest.delete(`/toledo/lists/123`, {
        session: sessionMockData.toledo,
      });
      expect(response.statusCode).toBe(200);
    });

    it('should return 401', async () => {
      const response = await supertest.delete('/toledo/lists/123');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.delete('/toledo/lists/123', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });
  });
});
