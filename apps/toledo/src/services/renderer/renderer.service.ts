import { ServiceMixin } from '@spuxx/js-utils';
import type { ThemeInstance } from 'vuetify';

export class Renderer extends ServiceMixin<Renderer>() {
  /**
   * Updates the current theme color in PWA mode.
   * @param themeInstance The return value of Vuetify's `useTheme()`.
   */
  static updateThemeColor(themeInstance: ThemeInstance) {
    const { global, themes } = themeInstance;
    const theme = global.name.value;
    const color = themes.value[theme].colors.surface;
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    const metaAppleStatusBarStyle = document.querySelector(
      "meta[name='apple-mobile-web-app-status-bar-style']",
    );
    if (metaThemeColor && color) {
      metaThemeColor.setAttribute('content', color);
    }
    if (metaAppleStatusBarStyle && color) {
      metaAppleStatusBarStyle.setAttribute('content', color);
    }
  }
}
