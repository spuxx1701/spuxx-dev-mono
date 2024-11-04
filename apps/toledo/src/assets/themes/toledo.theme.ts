import type { ThemeDefinition } from 'vuetify';
import colors from 'vuetify/util/colors';

export const toledoTheme: ThemeDefinition = {
  colors: {
    content: colors.grey.lighten5,
    background: colors.grey.darken4,
    accent: colors.teal.accent4,
    primary: colors.teal.darken1,
    secondary: colors.grey.darken3,
  },
};