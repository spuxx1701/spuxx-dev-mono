import { TestOrmModule } from '@spuxx-api/tests/database/test-orm-module';
import { Supertest, TestContainer } from '@spuxx/nest-utils';
import { ListsModule } from '../lists.module';
import { authConfig } from '@spuxx-api/src/auth/auth.config';
import { listCreateMockData } from '@mock-data/list.create.mock-data';
import { sessionMockData } from '@mock-data/session.mock-data';
import { ListReadResource } from '../dtos/list.read.resource';

describe('ListsActionsController', () => {
  let supertest: Supertest;

  beforeEach(async () => {
    const container = await TestContainer.create({
      imports: [TestOrmModule, ListsModule],
      enableEndToEnd: true,
      authOptions: { ...authConfig },
    });
    supertest = container.supertest;
  });

  describe('generateInvite', () => {
    it('should successfully generate an invite', async () => {
      const createResponse = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      expect(createResponse.statusCode).toBe(201);
      const id = createResponse.body.id;
      const response = await supertest.post(`/toledo/lists/${id}/generate-invite`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(201);
      const { link, code }: { link: string; code: string } = response.body;
      expect(link).toBeDefined();
      expect(code).toBeDefined();
      expect(link.includes(code)).toBe(true);
    });

    it('should return 401', async () => {
      const response = await supertest.post('/toledo/lists/123/generate-invite');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.post('/toledo/lists/123/generate-invite', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });

    it("should return 404 if the list doesn't exist", async () => {
      const response = await supertest.post('/toledo/lists/123/generate-invite', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(404);
    });

    it('should return 404 if not called by the list owner', async () => {
      const createResponse = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      expect(createResponse.statusCode).toBe(201);
      const id = createResponse.body.id;
      const response = await supertest.post(`/toledo/lists/${id}/generate-invite`, {
        session: sessionMockData.toledoUser,
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('acceptInvite', () => {
    it('should successfully accept an invite and add the user to the list as a guest', async () => {
      const createResponse = await supertest.post('/toledo/lists', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      expect(createResponse.statusCode).toBe(201);
      const id = createResponse.body.id;
      const generateInviteResponse = await supertest.post(`/toledo/lists/${id}/generate-invite`, {
        session: sessionMockData.privileged,
      });
      expect(generateInviteResponse.statusCode).toBe(201);
      const { code }: { code: string } = generateInviteResponse.body;
      const response = await supertest.put(`/toledo/lists/${id}/accept-invite?code=${code}`, {
        session: sessionMockData.toledoUser,
      });
      expect(response.statusCode).toBe(200);
      // Check that the user was added to the list as a guest
      let getResponse = await supertest.get(`/toledo/lists/${id}?include=guests`, {
        session: sessionMockData.toledoUser,
      });
      expect(getResponse.statusCode).toBe(200);
      let list: ListReadResource = getResponse.body;
      expect(list.owner.id).toBe(sessionMockData.privileged.sub);
      expect(list.guests.length).toBe(1);
      expect(list.guests[0].id).toBe(sessionMockData.toledoUser.sub);
      // Should not turn up twice
      await supertest.put(`/toledo/lists/${id}/accept-invite?code=${code}`, {
        session: sessionMockData.toledoUser,
      });
      getResponse = await supertest.get(`/toledo/lists/${id}?include=guests`, {
        session: sessionMockData.toledoUser,
      });
      expect(getResponse.statusCode).toBe(200);
      list = getResponse.body;
      expect(list.guests.length).toBe(1);
      expect(list.guests[0].id).toBe(sessionMockData.toledoUser.sub);
    });

    it('should return 400 due to missing code', async () => {
      const response = await supertest.put('/toledo/lists/123/accept-invite', {
        session: sessionMockData.toledoUser,
      });
      expect(response.statusCode).toBe(400);
    });

    it('should return 400 due to invalid code', async () => {
      const response = await supertest.put('/toledo/lists/123/accept-invite?code=', {
        session: sessionMockData.toledoUser,
      });
      expect(response.statusCode).toBe(400);
    });

    it('should return 401', async () => {
      const response = await supertest.put(`/toledo/lists/123/accept-invite?code=123`);
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.put('/toledo/lists/123/accept-invite?code=123', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });

    it("should return 404 if the list doesn't exist", async () => {
      const response = await supertest.put('/toledo/lists/123/accept-invite?code=123', {
        body: listCreateMockData.groceries,
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(404);
    });
  });
});
