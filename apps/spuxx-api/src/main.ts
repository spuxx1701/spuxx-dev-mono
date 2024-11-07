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

  app.enableCors({
    methods: ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'UPDATE', 'DELETE'],
    origin: EnvModule.get('ALLOWED_CORS_ORIGINS').split(','),
    credentials: true,
  });

  bootstrapOpenApi(app);

  await AuthModule.bootstrap(app, authConfig);

  await app.listen(EnvModule.get('APP_PORT'));
  Logger.log(
    `Application is running on: http://localhost:${EnvModule.get('APP_PORT')}`,
    'Bootstrap',
  );
  Logger.verbose('Verbose logging is enabled.', 'Bootstrap');
}

bootstrap();
