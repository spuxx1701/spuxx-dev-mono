import { EnvModuleMixin, ApplicationLogLevel } from '@spuxx/nest-utils';
import { IsIn, IsString, IsUrl } from 'class-validator';

class Env {
  @IsString()
  @IsIn(Object.values(ApplicationLogLevel))
  APP_LOG_LEVEL: ApplicationLogLevel = ApplicationLogLevel.Default;

  @IsString()
  APP_BASE_URL: string = 'https://api.spuxx.dev';

  @IsUrl()
  AUTH_ISSUER_URL: string = 'https://auth.spuxx.dev/realms/spuxx';

  @IsString()
  AUTH_CLIENT_ID: string = 'spuxx-api';

  @IsString()
  AUTH_CLIENT_SECRET: string;
}
export class EnvModule extends EnvModuleMixin<Env>(Env) {}
