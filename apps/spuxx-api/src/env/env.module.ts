import { EnvModuleMixin, ApplicationLogLevel, TransformBooleanString } from '@spuxx/nest-utils';
import { IsBoolean, IsIn, IsNumber, IsString, IsUrl } from 'class-validator';

class Env {
  @IsString()
  @IsIn(Object.values(ApplicationLogLevel))
  APP_LOG_LEVEL: ApplicationLogLevel = ApplicationLogLevel.Default;

  @IsString()
  APP_BASE_URL: string = 'https://api.spuxx.dev';

  @IsString()
  ALLOWED_CORS_ORIGINS: string;

  @IsUrl()
  AUTH_ISSUER_URL: string = 'https://auth.spuxx.dev/realms/main';

  @IsString()
  AUTH_CLIENT_ID: string = 'spuxx-api';

  @IsString()
  AUTH_CLIENT_SECRET: string;

  @IsString()
  AUTH_COOKIE_SECRET: string;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number = 3306;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_DB: string = 'spuxx-api';

  @TransformBooleanString()
  @IsBoolean()
  DATABASE_SYNCHRONIZE: boolean = true;
}
export class EnvModule extends EnvModuleMixin<Env>(Env) {}
