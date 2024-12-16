import type { ThemeDefinition } from 'vuetify';
import colors from 'vuetify/util/colors';

export const blueTheme: ThemeDefinition = {
  colors: {
    background: colors.blue.lighten4,
    'on-background': colors.blue.darken4,
    surface: colors.blue.lighten3,
    'on-surface': colors.blue.darken4,
    primary: colors.blue.darken4,
    'primary-darken-1': colors.blue.darken4,
    secondary: colors.blue.lighten3,
  },
};
