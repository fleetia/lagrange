import { createTheme, style } from '@vanilla-extract/css';

import { createSelectIndicatorTexture } from '../materials';
import { tokens } from '../tokens';
import { themeVars } from '../themeContract.css';
import { createThemeTokens } from '../themeTokens';

export const archiveThemeClass = createTheme(
  themeVars,
  createThemeTokens({
    semantic: {
      color: {
        surface: {
          canvas: '#e8e3d3',
          raised: '#f4efe1',
          muted: '#d8d1bd',
        },
        content: {
          primary: '#253138',
          secondary: '#5b676b',
          accent: '#214f5d',
          onAccent: '#f7f1e2',
        },
        border: {
          strong: '#506266',
          subtle: '#a4ada7',
        },
        interaction: {
          primary: '#214f5d',
          primaryHover: '#7a5736',
          focus: '#b65a3c',
          focusSurface: '#ecd3c6',
        },
        selection: {
          indicator: '#7a5736',
          surface: '#dce0c9',
        },
        status: {
          positive: '#5c6745',
          positiveSurface: '#dce0c9',
          critical: '#a34532',
          criticalSurface: '#edd3c9',
        },
      },
      material: {
        canvasTexture:
          'radial-gradient(circle at 1px 1px, rgba(33, 79, 93, 0.12) 0.5px, transparent 0.7px)',
        canvasTextureSize: '7px 9px',
      },
    },
    component: {
      control: {
        selectIndicator: createSelectIndicatorTexture('#214f5d'),
      },
      table: {
        headerSurface: '#cbd3ca',
      },
    },
  }),
  'archive',
);

export const nestedOverrideThemeClass = createTheme(
  themeVars,
  createThemeTokens({
    component: {
      button: {
        primaryBackground: '#173a5e',
      },
    },
  }),
  'nested-override',
);

export const legacyAccentOverride = style({
  vars: {
    [themeVars.semantic.color.content.accent]: '#c2412d',
  },
});

export const themeComparison = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens.space.xl,
  '@media': {
    '(max-width: 52rem)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const themeSpecimen = style({
  display: 'grid',
  minWidth: 0,
  gap: tokens.space.lg,
  padding: tokens.space.xl,
  borderTop: `${tokens.border.hairline} solid currentColor`,
  borderBottom: `${tokens.border.hairline} solid currentColor`,
});

export const themeActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'end',
  gap: tokens.space.sm,
});

export const themeField = style({
  minWidth: '10rem',
  flex: '1 1 10rem',
});

export const nestedThemeSpecimen = style({
  display: 'grid',
  alignContent: 'start',
  gap: tokens.space.lg,
  padding: tokens.space.xl,
});
