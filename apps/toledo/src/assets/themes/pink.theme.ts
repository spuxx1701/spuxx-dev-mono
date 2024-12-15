import type { ThemeDefinition } from 'vuetify';
import colors from 'vuetify/util/colors';

export const pinkTheme: ThemeDefinition = {
  colors: {
    background: colors.pink.lighten4,
    'on-background': colors.pink.darken4,
    surface: colors.pink.lighten3,
    'on-surface': colors.pink.darken4,
    primary: colors.pink.darken4,
    'primary-darken-1': colors.pink.darken4,
    secondary: colors.pink.lighten3,
  },
};
