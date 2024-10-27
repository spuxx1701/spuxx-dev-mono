import { Supertest, TestContainer } from '@spuxx/nest-utils';
import { ListsModule } from '../lists.module';
import { TestOrmModule } from '@tests/database/test-orm-module';
import { authConfig } from '@src/auth/auth.config';
import { ListsProvider } from '../services/lists.provider';
import { listCreateMockData } from 'mock-data/list.create.mock-data';
import { sessionMockData } from 'mock-data/session.mock-data';

describe('ListsController', () => {
  let supertest: Supertest;
  let provider: ListsProvider;

  beforeEach(async () => {
    const container = await TestContainer.create({
      imports: [TestOrmModule, ListsModule],
      enableEndToEnd: true,
      authOptions: { ...authConfig },
    });
    supertest = container.supertest;
    provider = container.app.get(ListsProvider);
  });

  describe('findMany', () => {
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
      await provider.create(listCreateMockData.toDos, {
        oidc: {
          user: sessionMockData.privileged,
        },
      } as never);
      const groceries = await provider.create(listCreateMockData.groceries, {
        oidc: {
          user: sessionMockData.privileged,
        },
      } as never);
      const response = await supertest.get(`/toledo/lists/${groceries.id}`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(groceries.dataValues);
    });

    it('should return 401', async () => {
      const response = await supertest.get('/toledo/lists/123');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.get('/toledo/lists/123', {
        session: {
          sub: '123',
          groups: [],
        },
      });
      expect(response.statusCode).toBe(403);
    });
  });

  describe('create', () => {
    it('should return 201', () => {});

    it('should return 401', async () => {
      const response = await supertest.post('/toledo/lists');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.post('/toledo/lists', {
        session: {
          sub: '123',
          groups: [],
        },
      });
      expect(response.statusCode).toBe(403);
    });
  });
});
