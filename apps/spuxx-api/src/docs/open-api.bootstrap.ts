import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { appConfig } from '../config/app.config';

export const bootstrapOpenApi = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(appConfig.openApi.title)
    .setDescription(appConfig.openApi.description)
    .setVersion(process.env.npm_package_name)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(appConfig.openApi.routesPrefix, app, document);
};
