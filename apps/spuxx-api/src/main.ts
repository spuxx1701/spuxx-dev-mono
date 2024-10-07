import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CustomLogger, AuthModule } from '@spuxx/nest-utils';
import { AppModule } from './app.module';
import { authConfig } from './auth/auth.config';
import { EnvModule } from './env/env.module';
import { bootstrapOpenApi } from './docs/open-api.bootstrap';

async function bootstrap() {
  const logger = new CustomLogger({
    logLevel: EnvModule.get('APP_LOG_LEVEL'),
  });
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  bootstrapOpenApi(app);

  await AuthModule.bootstrap(app, authConfig);

  await app.listen(3000);
  Logger.log(`Application is running on: http://localhost:3000`, 'Bootstrap');
  Logger.verbose('Verbose logging is enabled.', 'Bootstrap');
}

bootstrap();
