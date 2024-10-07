import { AppController } from './app.controller';
import { TestContainer, Supertest } from '@spuxx/nest-utils';
import { authConfig, AuthRole } from './auth/auth.config';

describe('AppController', () => {
  let supertest: Supertest;

  beforeEach(async () => {
    const container = await TestContainer.create({
      controllers: [AppController],
      authOptions: authConfig,
      enableEndToEnd: true,
    });
    supertest = container.supertest;
  });

  describe('root', () => {
    it('should be successful', async () => {
      const response = await supertest.get('/');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Hello there!');
      expect(response.body.session).toBe('Not logged in');
    });

    it('should indicate the current session', async () => {
      const response = await supertest.get('/', {
        session: {
          sub: '123',
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.session).toBe('Logged in as John Doe');
    });
  });

  describe('protected', () => {
    it('should be successful', async () => {
      const response = await supertest.get('/protected', {
        session: {
          sub: '123',
          realm_access: { roles: [AuthRole.user] },
        },
      });
      expect(response.statusCode).toBe(200);
    });

    it('should return 401', async () => {
      const response = await supertest.get('/protected');
      expect(response.statusCode).toBe(401);
    });

    it('should return 403', async () => {
      const response = await supertest.get('/protected', {
        session: {
          sub: '123',
        },
      });
      expect(response.statusCode).toBe(403);
    });
  });
});
