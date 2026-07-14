import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const dialog = style({
  boxSizing: 'border-box',
  width: `calc(100% - ${semanticVars.space.xxl})`,
  maxHeight: `calc(100dvh - ${semanticVars.space.xxl})`,
  margin: 'auto',
  padding: 0,
  overflow: 'hidden',
  color: componentVars.overlay.text,
  backgroundColor: componentVars.overlay.surface,
  border: `${semanticVars.border.width.hairline} solid ${componentVars.overlay.border}`,
  borderRadius: semanticVars.shape.radius.none,
});

globalStyle(`${dialog}:not([open])`, {
  display: 'none',
});

globalStyle(`${dialog}::backdrop`, {
  background: componentVars.overlay.backdrop,
});

export const size = styleVariants({
  small: { maxWidth: '24rem' },
  medium: { maxWidth: '36rem' },
  large: { maxWidth: '56rem' },
});

export const frame = style({
  display: 'flex',
  maxHeight: 'inherit',
  flexDirection: 'column',
});

export const header = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: semanticVars.space.md,
  padding: `${semanticVars.space.sm} ${semanticVars.space.lg}`,
  borderBottom: `${semanticVars.border.width.hairline} double ${componentVars.overlay.border}`,
});

export const title = style({
  minWidth: 0,
  color: componentVars.overlay.text,
});

export const body = style({
  minHeight: 0,
  padding: semanticVars.space.lg,
  overflowY: 'auto',
});

export const footer = style({
  display: 'flex',
  flexShrink: 0,
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: semanticVars.space.sm,
  padding: `${semanticVars.space.sm} ${semanticVars.space.lg}`,
  borderTop: `${semanticVars.border.width.hairline} dotted ${componentVars.overlay.border}`,
});
