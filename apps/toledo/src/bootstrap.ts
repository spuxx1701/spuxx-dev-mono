import { Config } from '@spuxx/browser-utils';
import { appConfig, type AppConfig } from './config/app.config';
import { Intl, Logger } from '@spuxx/js-utils';
import de from './assets/locales/de.yaml';

Config.setup<AppConfig>({ defaultConfig: appConfig, importMetaEnv: import.meta.env });
Logger.setLevel(Config.getConfig<AppConfig>().LOG_LEVEL);

Intl.setup({
  fallbackLocale: Config.getConfig<AppConfig>().DEFAULT_LOCALE,
  dictionaries: [
    {
      locale: 'de',
      values: de,
    },
  ],
});
