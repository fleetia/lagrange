import { globalStyle, style } from '@vanilla-extract/css';

import {
  componentVars,
  semanticVars,
} from '../../theme/themeContract.css';

const progress = 'var(--lagrange-range-progress, 50%)';
const activeTrack = componentVars.range.activeTrack;
const track = componentVars.range.track;

export const rangeField = style({
  width: '100%',
  height: componentVars.control.compactHeight,
  margin: 0,
  padding: 0,
  appearance: 'none',
  color: componentVars.range.thumb,
  accentColor: activeTrack,
  background: `linear-gradient(to right, ${activeTrack} 0, ${activeTrack} ${progress}, ${track} ${progress}, ${track} 100%) center / 100% ${semanticVars.border.width.hairline} no-repeat`,
  border: 0,
  borderRadius: semanticVars.shape.radius.none,
  cursor: 'pointer',
  outline: 0,
  selectors: {
    '&[data-invalid="true"]': {
      background: `linear-gradient(to right, ${componentVars.control.invalidIndicator} 0, ${componentVars.control.invalidIndicator} ${progress}, ${track} ${progress}, ${track} 100%) center / 100% ${semanticVars.border.width.hairline} no-repeat`,
    },
    '&:disabled': {
      color: componentVars.range.disabledThumb,
      background: `linear-gradient(to right, ${componentVars.range.disabledTrack} 0, ${componentVars.range.disabledTrack} 100%) center / 100% ${semanticVars.border.width.hairline} no-repeat`,
      cursor: 'not-allowed',
      opacity: 0.62,
    },
  },
});

globalStyle(`${rangeField}::-webkit-slider-runnable-track`, {
  height: semanticVars.border.width.hairline,
  background: 'transparent',
});

globalStyle(`${rangeField}::-webkit-slider-thumb`, {
  width: '0.75rem',
  height: '0.75rem',
  marginTop: '-0.34375rem',
  appearance: 'none',
  backgroundColor: componentVars.range.thumb,
  border: 0,
  borderRadius: semanticVars.shape.radius.none,
  boxShadow: `0 0 0 2px ${semanticVars.color.surface.raised}`,
});

globalStyle(`${rangeField}:focus-visible::-webkit-slider-thumb`, {
  boxShadow: `0 0 0 2px ${semanticVars.color.surface.raised}, 0 0 0 4px ${componentVars.range.focusIndicator}`,
});

globalStyle(`${rangeField}:disabled::-webkit-slider-thumb`, {
  backgroundColor: componentVars.range.disabledThumb,
});

globalStyle(`${rangeField}[data-invalid="true"]::-webkit-slider-thumb`, {
  backgroundColor: componentVars.control.invalidIndicator,
});

globalStyle(`${rangeField}::-moz-range-track`, {
  height: semanticVars.border.width.hairline,
  backgroundColor: componentVars.range.track,
});

globalStyle(`${rangeField}::-moz-range-progress`, {
  height: semanticVars.border.width.hairline,
  backgroundColor: componentVars.range.activeTrack,
});

globalStyle(`${rangeField}::-moz-range-thumb`, {
  width: '0.75rem',
  height: '0.75rem',
  backgroundColor: componentVars.range.thumb,
  border: `2px solid ${semanticVars.color.surface.raised}`,
  borderRadius: semanticVars.shape.radius.none,
});

globalStyle(`${rangeField}:focus-visible::-moz-range-thumb`, {
  boxShadow: `0 0 0 2px ${componentVars.range.focusIndicator}`,
});

globalStyle(`${rangeField}:disabled::-moz-range-track`, {
  backgroundColor: componentVars.range.disabledTrack,
});

globalStyle(`${rangeField}:disabled::-moz-range-progress`, {
  backgroundColor: componentVars.range.disabledTrack,
});

globalStyle(`${rangeField}:disabled::-moz-range-thumb`, {
  backgroundColor: componentVars.range.disabledThumb,
});

globalStyle(`${rangeField}[data-invalid="true"]::-moz-range-progress`, {
  backgroundColor: componentVars.control.invalidIndicator,
});

globalStyle(`${rangeField}[data-invalid="true"]::-moz-range-thumb`, {
  backgroundColor: componentVars.control.invalidIndicator,
});
