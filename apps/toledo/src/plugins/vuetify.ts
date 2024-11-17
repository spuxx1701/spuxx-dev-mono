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
      color: 'secondary',
    },
    VSwitch: {
      color: 'primary',
    },
    VTextField: {
      variant: 'underlined',
      color: 'primary',
    },
    VAutocomplete: {
      variant: 'underlined',
      color: 'primary',
    },
    VNumberInput: {
      variant: 'underlined',
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
