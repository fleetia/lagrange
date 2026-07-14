import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const root = style({
  minWidth: 0,
});

export const rootOrientation = styleVariants({
  horizontal: {
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
  },
  vertical: {
    display: 'grid',
    gridTemplateColumns: 'minmax(8rem, 11rem) minmax(0, 1fr)',
  },
});

export const list = style({
  display: 'flex',
  minWidth: 0,
});

export const listOrientation = styleVariants({
  horizontal: {
    flexFlow: 'row wrap',
    alignItems: 'stretch',
    borderBottom: `${semanticVars.border.width.hairline} solid ${componentVars.navigation.separator}`,
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
    borderInlineEnd: `${semanticVars.border.width.hairline} solid ${componentVars.navigation.separator}`,
  },
});

export const tab = style({
  position: 'relative',
  display: 'inline-flex',
  minHeight: semanticVars.dimension.row,
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: 0,
  padding: `${semanticVars.space.xs} ${semanticVars.space.md}`,
  color: componentVars.navigation.text,
  backgroundColor: 'transparent',
  border: 0,
  borderBottom: `${semanticVars.border.width.hairline} dotted ${componentVars.navigation.separator}`,
  borderRadius: semanticVars.shape.radius.none,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.label,
  fontWeight: 650,
  lineHeight: semanticVars.typography.lineHeight.compact,
  letterSpacing: '0.045em',
  textAlign: 'start',
  cursor: 'pointer',
  selectors: {
    '&::before': {
      position: 'absolute',
      insetBlock: semanticVars.space.xxs,
      insetInlineStart: 0,
      width: '2px',
      backgroundColor: 'transparent',
      content: '',
    },
    '&:hover:not(:disabled)': {
      color: componentVars.navigation.hoverText,
      backgroundColor: componentVars.navigation.hoverSurface,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      backgroundColor: componentVars.navigation.hoverSurface,
      boxShadow: `inset 0 0 0 ${semanticVars.border.width.hairline} ${semanticVars.color.interaction.focus}`,
    },
    '&[aria-selected="true"]': {
      color: componentVars.navigation.selectedText,
      backgroundColor: componentVars.navigation.selectedSurface,
      borderBottomColor: componentVars.navigation.selectedIndicator,
      borderBottomStyle: 'solid',
    },
    '&[aria-selected="true"]::before': {
      backgroundColor: componentVars.navigation.selectedIndicator,
    },
    '&:disabled': {
      color: componentVars.navigation.text,
      cursor: 'not-allowed',
      opacity: 0.48,
    },
  },
});

export const panel = style({
  minWidth: 0,
  padding: semanticVars.space.lg,
  color: componentVars.navigation.text,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.body,
  lineHeight: semanticVars.typography.lineHeight.body,
  selectors: {
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      boxShadow: `inset 3px 0 ${semanticVars.color.interaction.focus}`,
    },
  },
});
