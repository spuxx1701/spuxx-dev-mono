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
  defaults: {
    VBtn: {
      variant: 'flat',
    },
    VSwitch: {
      color: 'primary',
    },
    VTextField: {
      variant: 'outlined',
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
      color: 'primary',
    },
    VAutocomplete: {
      variant: 'outlined',
      color: 'primary',
    },
    VNumberInput: {
      variant: 'outlined',
      color: 'primary',
    },
    VListItem: {
      color: 'primary',
    },
    VExpansionPanels: {
      color: 'surface',
    },
    VCard: {
      variant: 'flat',
      color: 'surface',
    },
  },
  theme: {
    defaultTheme: 'toledo',
    themes: {
      toledo: toledoTheme,
    },
  },
});
