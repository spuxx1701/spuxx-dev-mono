import { TestContainer } from '@spuxx/nest-utils';
import { AppModule } from './app.module';

describe('AppModule', () => {
  it('should be ok', async () => {
    vitest.stubEnv('AUTH_CLIENT_SECRET', 'something');
    const container = await TestContainer.create({
      imports: [AppModule],
    });
    expect(container.module).toBeDefined();
  });
});
