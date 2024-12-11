import { sessionMockData } from '@tests/mock-data/session.mock-data';
import { authConfig } from '@src/auth/auth.config';
import { ListsModule } from '@src/toledo/lists/lists.module';
import { TestOrmModule } from '@tests/database/test-orm-module';
import { AuthModule, SessionResource } from '@spuxx/nest-utils';
import { UserReadResource } from '../dtos/user.read.resource';
import { Supertest, TestContainer } from '@spuxx/nest-testing';

describe('UsersController', () => {
  let supertest: Supertest;

  beforeEach(async () => {
    const container = await TestContainer.create({
      imports: [AuthModule.forRoot(authConfig), TestOrmModule, ListsModule],
      enableEndToEnd: true,
    });
    supertest = container.supertest;
  });

  describe('findMany', () => {
    it('should return 200', async () => {
      const response = await supertest.get('/users', {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(200);
    });

    it('should return 401', async () => {
      const response = await supertest.get('/users');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.get('/users', {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });
  });

  describe('findById', () => {
    it('should return 200', async () => {
      const sessionResponse = await supertest.get('/auth/session', {
        session: sessionMockData.privileged,
      });
      const session: SessionResource = sessionResponse.body;
      const response = await supertest.get(`/users/${session.sub}`, {
        session: sessionMockData.privileged,
      });
      const user: UserReadResource = response.body;
      expect(response.statusCode).toBe(200);
      expect(user.id).toBe(session.sub);
      expect(user.firstName).toBe(session.given_name);
      expect(user.familyName).toBe(session.family_name);
      expect(user.username).toBe(session.preferred_username);
    });

    it('should return 401', async () => {
      const response = await supertest.get(`/users/${crypto.randomUUID()}`);
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.get(`/users/${crypto.randomUUID()}`, {
        session: sessionMockData.unprivileged,
      });
      expect(response.statusCode).toBe(403);
    });

    it('should return 404', async () => {
      const response = await supertest.get(`/users/${crypto.randomUUID()}`, {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(404);
    });
  });
});
