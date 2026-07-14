import { createTheme } from '@vanilla-extract/css';
import {
  createThemeTokens,
  themeVars,
} from '@fleetia/lagrange/theme';

export const brandThemeClass = createTheme(
  themeVars,
  createThemeTokens({
    semantic: {
      color: {
        content: { accent: '#294f59' },
        interaction: {
          primary: '#294f59',
          primaryHover: '#7a5736',
        },
      },
    },
  }),
  'consumer-brand',
);
