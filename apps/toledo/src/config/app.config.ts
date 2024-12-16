import type { LogLevel } from '@spuxx/js-utils';

export interface AppConfig {
  /**
   * The URL of the api service.
   */
  API_URL: string;
  /**
   * The URL of the IDP's account service page.
   */
  ACCOUNT_SERVICE_URL: string;
  /**
   * The default locale of the application.
   */
  DEFAULT_LOCALE: string;
  /**
   * The log level of the application.
   */
  LOG_LEVEL: LogLevel;
}

export const appConfig: AppConfig = {
  API_URL: 'https://api.spuxx.dev',
  ACCOUNT_SERVICE_URL: 'https://auth.spuxx.dev/realms/main/account',
  DEFAULT_LOCALE: 'de',
  LOG_LEVEL: 'debug',
};
