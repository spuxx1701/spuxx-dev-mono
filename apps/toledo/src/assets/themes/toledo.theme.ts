import type { ThemeDefinition } from 'vuetify';
import colors from 'vuetify/util/colors';

export const toledoTheme: ThemeDefinition = {
  colors: {
    text: colors.grey.lighten5,
    background: colors.grey.darken4,
    surface: '#151515',
    primary: colors.teal.accent4,
    'primary-darken-1': colors.teal.darken2,
    secondary: '#151515',
  },
};
