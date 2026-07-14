import { style } from '@vanilla-extract/css';

import {
  componentVars,
  semanticVars,
} from '../../theme/themeContract.css';

export const breadcrumb = style({
  minWidth: 0,
});

export const list = style({
  display: 'flex',
  minWidth: 0,
  flexFlow: 'row wrap',
  alignItems: 'center',
  gap: semanticVars.space.xs,
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const listItem = style({
  display: 'inline-flex',
  minWidth: 0,
  alignItems: 'center',
});

export const item = style({
  minWidth: 0,
  margin: 0,
  padding: `${semanticVars.space.xxs} 0`,
  overflow: 'hidden',
  color: componentVars.navigation.text,
  background: 'none',
  border: 0,
  borderBottom: `${semanticVars.border.width.hairline} solid transparent`,
  borderRadius: semanticVars.shape.radius.none,
  cursor: 'pointer',
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.label,
  fontWeight: 600,
  lineHeight: semanticVars.typography.lineHeight.compact,
  textDecoration: 'none',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  selectors: {
    '&:hover': {
      color: componentVars.navigation.hoverText,
      backgroundColor: componentVars.navigation.hoverSurface,
      borderBottomColor: componentVars.navigation.separator,
    },
    '&:focus-visible': {
      color: componentVars.navigation.hoverText,
      backgroundColor: componentVars.navigation.hoverSurface,
      borderBottomColor: semanticVars.color.interaction.focus,
      outline: 0,
      boxShadow: `-2px 0 0 ${semanticVars.color.interaction.focus}`,
    },
  },
});

export const currentItem = style({
  color: componentVars.navigation.selectedText,
  backgroundColor: componentVars.navigation.selectedSurface,
  borderBottomColor: componentVars.navigation.selectedIndicator,
  fontWeight: 700,
});

export const separator = style({
  color: componentVars.navigation.separator,
  fontFamily: semanticVars.typography.family.data,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
  listStyle: 'none',
});
