import { Controller, Get, Header, Req } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import type { Request } from 'express';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { appConfig } from './config/app.config';
import { isAuthenticated, getSession } from '@spuxx/nest-utils';

@Controller()
@ApiTags('General')
export class AppController {
  @Get()
  @ApiOperation({
    summary: "The application's root route.",
    description: 'Returns general information on the application.',
  })
  getHello(@Req() request: Request): object {
    const response = {
      application: process.env.npm_package_name,
      version: process.env.npm_package_version,
      rootUrl: EnvModule.get('APP_BASE_URL'),
      session: isAuthenticated(request) ? `Logged in as ${getSession(request).preferred_username}.` : 'Not logged in.',
      author: appConfig.author,
      repository: 'https://github.com/spuxx1701/spuxx-dev-mono',
      auth: {
        login: `${EnvModule.get('APP_BASE_URL')}/auth/login`,
        logout: `${EnvModule.get('APP_BASE_URL')}/auth/logout`,
        session: `${EnvModule.get('APP_BASE_URL')}/auth/session`,
        account: `${EnvModule.get('AUTH_ISSUER_URL')}/account`,
      },
      docs: {
        'swagger-ui': `${EnvModule.get('APP_BASE_URL')}/${appConfig.openApi.routesPrefix}`,
        'openapi-json': `${EnvModule.get('APP_BASE_URL')}/${appConfig.openApi.routesPrefix}-json`,
      },
      other: {
        'robots.txt': `${EnvModule.get('APP_BASE_URL')}/robots.txt`,
        'security.txt': `${EnvModule.get('APP_BASE_URL')}/security.txt`,
      },
    };
    return response;
  }

  @Get('/robots.txt')
  @Header('Content-Type', 'text/plain')
  @ApiExcludeEndpoint()
  getRobotsTxt() {
    return 'User-agent: *\n' + 'Disallow: /';
  }

  @Get('/security.txt')
  @Header('Content-Type', 'text/plain')
  @ApiExcludeEndpoint()
  getSecurityTxt() {
    return `Contact: ${appConfig.author.email}`;
  }
}
