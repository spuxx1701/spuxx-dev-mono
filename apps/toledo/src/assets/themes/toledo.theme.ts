import type { ThemeDefinition } from 'vuetify';
import colors from 'vuetify/util/colors';

export const toledoTheme: ThemeDefinition = {
  colors: {
    text: colors.grey.lighten5,
    background: colors.grey.darken4,
    surface: colors.grey.darken3,
    accent: colors.teal.accent4,
    primary: colors.teal.darken1,
    secondary: colors.grey.darken3,
  },
};
