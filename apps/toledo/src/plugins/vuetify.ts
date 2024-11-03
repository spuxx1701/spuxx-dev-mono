import { toledoTheme } from '@/assets/themes/toledo.theme';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

export const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'toledo',
    themes: {
      toledo: toledoTheme,
    },
  },
});
