import { style, styleVariants } from '@vanilla-extract/css';

import { control } from '../controls.css';

export const textArea = style([
  control,
  {
    height: 'auto',
    minHeight: '4.5rem',
    display: 'block',
  },
]);

export const resize = styleVariants({
  none: { resize: 'none' },
  vertical: { resize: 'vertical' },
  both: { resize: 'both' },
});
