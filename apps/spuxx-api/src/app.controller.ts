import { Controller, ForbiddenException, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import type { Request } from 'express';
import { AuthGuard, Roles } from '@spuxx/nest-utils';
import { AuthRole } from './auth/auth.config';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

@Controller()
export class AppController {
  @Get()
  getHello(@Req() request: Request): object {
    const response = {
      message: 'Hello there!',
      time: new Date().toLocaleTimeString(),
      session: request.oidc.user ? `Logged in as ${request.oidc.user.name}` : 'Not logged in',
      routes: {
        auth: {
          login: `${EnvModule.get('APP_BASE_URL')}/auth/login`,
          logout: `${EnvModule.get('APP_BASE_URL')}/auth/logout`,
          session: `${EnvModule.get('APP_BASE_URL')}/auth/session`,
        },
      },
    };
    return response;
  }

  @Get('/protected')
  @UseGuards(AuthGuard)
  @Roles(AuthRole.user)
  @ApiException(() => [UnauthorizedException, ForbiddenException])
  getProtectedHello(@Req() request: Request) {
    return `Oh hello there, ${request.oidc.user.name}! This route is protected, but you can see it! Not bad!`;
  }
}
