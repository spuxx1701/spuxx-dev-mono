import { AppController } from './app.controller';
import { TestContainer, Supertest } from '@spuxx/nest-testing';
import { authConfig } from './auth/auth.config';
import { sessionMockData } from '@tests/mock-data/session.mock-data';
import { AuthModule } from '@spuxx/nest-utils';

describe('AppController', () => {
  let supertest: Supertest;

  beforeEach(async () => {
    const container = await TestContainer.create({
      imports: [AuthModule.forRoot(authConfig)],
      controllers: [AppController],
      enableEndToEnd: true,
    });
    supertest = container.supertest;
  });

  describe('getIndex', () => {
    it('should return 200', async () => {
      const response = await supertest.get('/');
      expect(response.statusCode).toBe(200);
    });

    it('should indicate the current session', async () => {
      const response = await supertest.get('/', {
        session: sessionMockData.privileged,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.session).toBe(
        `Logged in as ${sessionMockData.privileged.preferred_username}.`,
      );
    });
  });

  describe('alive', () => {
    it('should return 200', async () => {
      const response = await supertest.get('/alive');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('robotsTxt', () => {
    it('should return 200', async () => {
      const response = await supertest.get('/robots.txt');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('securityTxt', () => {
    it('should return 200', async () => {
      const response = await supertest.get('/security.txt');
      expect(response.statusCode).toBe(200);
    });
  });
});
