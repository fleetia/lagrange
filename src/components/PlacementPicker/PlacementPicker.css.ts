import { style } from '@vanilla-extract/css';

import {
  componentVars,
  semanticVars,
} from '../../theme/themeContract.css';

export const picker = style({
  display: 'inline-grid',
  minWidth: 0,
  gridTemplateColumns: 'repeat(3, 2rem)',
  gap: semanticVars.space.xxs,
  padding: semanticVars.space.xs,
  backgroundColor: semanticVars.color.surface.raised,
  borderBlock: `${semanticVars.border.width.hairline} solid ${componentVars.navigation.separator}`,
});

export const option = style({
  position: 'relative',
  boxSizing: 'border-box',
  width: '2rem',
  height: '2rem',
  padding: 0,
  color: componentVars.navigation.text,
  backgroundColor: 'transparent',
  border: `${semanticVars.border.width.hairline} solid ${componentVars.navigation.separator}`,
  borderRadius: semanticVars.shape.radius.none,
  cursor: 'pointer',
  selectors: {
    '&::after': {
      position: 'absolute',
      inset: '0.6875rem',
      backgroundColor: 'transparent',
      content: '',
    },
    '&:hover:not(:disabled)': {
      color: componentVars.navigation.hoverText,
      backgroundColor: componentVars.navigation.hoverSurface,
      borderColor: componentVars.navigation.selectedIndicator,
    },
    '&[data-checked="true"]': {
      color: componentVars.navigation.selectedText,
      backgroundColor: componentVars.navigation.selectedSurface,
      borderColor: componentVars.navigation.selectedIndicator,
    },
    '&[data-checked="true"]::after': {
      backgroundColor: componentVars.navigation.selectedIndicator,
    },
    '&:focus-visible': {
      backgroundColor: componentVars.navigation.hoverSurface,
      borderColor: semanticVars.color.interaction.focus,
      outline: 0,
      boxShadow: `inset 3px 0 0 ${semanticVars.color.interaction.focus}`,
    },
    '&:disabled': {
      color: componentVars.choice.disabledText,
      backgroundColor: componentVars.choice.disabledSurface,
      cursor: 'not-allowed',
      opacity: 0.62,
    },
  },
});
