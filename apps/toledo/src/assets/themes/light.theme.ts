import type { ThemeDefinition } from 'vuetify';
import colors from 'vuetify/util/colors';

export const lightTheme: ThemeDefinition = {
  colors: {
    background: colors.grey.lighten4,
    surface: colors.grey.lighten2,
    primary: colors.teal.darken2,
    'primary-darken-1': colors.teal.darken2,
    secondary: colors.grey.lighten4,
  },
};
