import { LocalStorageMixin } from '@spuxx/browser-utils';

export interface ILocalStorage {
  lastEncounteredVersion: string;
  theme: string;
}

export class LocalStorage extends LocalStorageMixin<ILocalStorage>({
  key: 'toledo',
  defaultValues: {
    lastEncounteredVersion: APP_VERSION,
    theme: 'dark',
  },
}) {
  static loadTheme(): string {
    const theme = this.get('theme');
    return theme;
  }
}
