import type { ThemeDefinition } from 'vuetify';
import colors from 'vuetify/util/colors';

export const greenTheme: ThemeDefinition = {
  colors: {
    background: colors.green.lighten4,
    'on-background': colors.green.darken4,
    surface: colors.green.lighten3,
    'on-surface': colors.green.darken4,
    primary: colors.green.darken4,
    'primary-darken-1': colors.green.darken4,
    secondary: colors.green.lighten3,
  },
};
