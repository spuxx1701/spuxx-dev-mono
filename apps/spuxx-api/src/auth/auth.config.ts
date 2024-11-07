import { AuthOptions } from '@spuxx/nest-utils';
import { EnvModule } from '../env/env.module';

export const AuthRole = {
  toledoParent: 'toledo_parent',
  toledo: 'toledo_user',
} as const;
export type AuthRole = (typeof AuthRole)[keyof typeof AuthRole];
export const authRoles = Object.values(AuthRole);

export const authConfig: AuthOptions = {
  disable: false,
  roles: AuthRole,
  allowedRedirectHostnames: ['localhost:5173'],
  oidc: {
    baseURL: EnvModule.get('APP_BASE_URL'),
    issuerBaseURL: EnvModule.get('AUTH_ISSUER_URL'),
    clientID: EnvModule.get('AUTH_CLIENT_ID'),
    clientSecret: EnvModule.get('AUTH_CLIENT_SECRET'),
    secret: EnvModule.get('AUTH_COOKIE_SECRET'),
  },
};
