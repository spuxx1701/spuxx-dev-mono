import type { LogLevel } from '@spuxx/js-utils';

export interface AppConfig {
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
  DEFAULT_LOCALE: 'de',
  LOG_LEVEL: 'debug',
};
