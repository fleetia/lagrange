import { createTheme, style } from '@vanilla-extract/css';

import { semanticVars, themeVars } from './themeContract.css';
import { componentTokens, semanticTokens } from './themeTokens';

const resetTokenGroup = <Group extends Readonly<Record<string, string>>>(
  group: Group,
): Group =>
  Object.fromEntries(Object.keys(group).map((key) => [key, 'initial'])) as Group;

const componentResetTokens = {
  control: resetTokenGroup(componentTokens.control),
  button: resetTokenGroup(componentTokens.button),
  choice: resetTokenGroup(componentTokens.choice),
  table: resetTokenGroup(componentTokens.table),
  rule: resetTokenGroup(componentTokens.rule),
  chart: resetTokenGroup(componentTokens.chart),
};

const semanticDefaultTokens = {
  ...semanticTokens,
  color: {
    ...semanticTokens.color,
    content: {
      ...semanticTokens.color.content,
      onAccent: 'initial',
    },
    interaction: {
      ...semanticTokens.color.interaction,
      primary: 'initial',
      primaryHover: 'initial',
    },
    selection: {
      indicator: 'initial',
      surface: 'initial',
    },
  },
};

export const lagrangeThemeClass = createTheme(
  themeVars,
  {
    semantic: semanticDefaultTokens,
    component: componentResetTokens,
  },
  'lagrange',
);

export const themeClass = lagrangeThemeClass;

export const vars = {
  color: {
    paper: themeVars.semantic.color.surface.canvas,
    paperRaised: themeVars.semantic.color.surface.raised,
    paperMuted: themeVars.semantic.color.surface.muted,
    ink: themeVars.semantic.color.content.primary,
    inkMuted: themeVars.semantic.color.content.secondary,
    rule: themeVars.semantic.color.border.strong,
    ruleMuted: themeVars.semantic.color.border.subtle,
    aubergine: themeVars.semantic.color.content.accent,
    periwinkle: themeVars.semantic.color.interaction.focus,
    periwinkleWash: themeVars.semantic.color.interaction.focusSurface,
    olive: themeVars.semantic.color.status.positive,
    oliveWash: themeVars.semantic.color.status.positiveSurface,
    vermilion: themeVars.semantic.color.status.critical,
    vermilionWash: themeVars.semantic.color.status.criticalSurface,
  },
  font: themeVars.semantic.typography.family,
  fontSize: themeVars.semantic.typography.size,
  lineHeight: themeVars.semantic.typography.lineHeight,
  space: themeVars.semantic.space,
  size: {
    control: themeVars.semantic.dimension.control,
    row: themeVars.semantic.dimension.row,
    ruleGap: themeVars.semantic.dimension.ruleGap,
  },
  radius: themeVars.semantic.shape.radius,
  border: {
    hairline: themeVars.semantic.border.width.hairline,
  },
} as const;

export const root = style({
  minWidth: 0,
  colorScheme: semanticVars.colorScheme,
  color: semanticVars.color.content.primary,
  backgroundColor: semanticVars.color.surface.canvas,
  backgroundImage: semanticVars.material.canvasTexture,
  backgroundPosition: '0 0',
  backgroundRepeat: 'repeat',
  backgroundSize: semanticVars.material.canvasTextureSize,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.body,
  lineHeight: semanticVars.typography.lineHeight.body,
  WebkitFontSmoothing: 'antialiased',
  textRendering: 'optimizeLegibility',
});
