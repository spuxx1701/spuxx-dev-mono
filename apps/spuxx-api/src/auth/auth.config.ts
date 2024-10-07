import { AuthOptions } from '@spuxx/nest-utils';
import { EnvModule } from '../env/env.module';

export const AuthRole = {
  user: 'test_user',
} as const;
export type AuthRole = (typeof AuthRole)[keyof typeof AuthRole];
export const authRoles = Object.values(AuthRole);

export const authConfig: AuthOptions = {
  disable: false,
  roles: AuthRole,
  oidc: {
    baseURL: EnvModule.get('APP_BASE_URL'),
    issuerBaseURL: EnvModule.get('AUTH_ISSUER_URL'),
    clientID: EnvModule.get('AUTH_CLIENT_ID'),
    clientSecret: EnvModule.get('AUTH_CLIENT_SECRET'),
    secret: EnvModule.get('AUTH_CLIENT_SECRET'),
  },
};
