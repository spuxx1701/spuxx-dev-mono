import type { ThemeDefinition } from 'vuetify';
import colors from 'vuetify/util/colors';

export const darkTheme: ThemeDefinition = {
  colors: {
    background: colors.blueGrey.darken4,
    surface: colors.blueGrey.darken3,
    primary: colors.teal.accent4,
    'primary-darken-1': colors.teal.darken2,
    secondary: colors.blueGrey.darken3,
  },
};
