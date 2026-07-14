export const tokens = {
  color: {
    paper: '#f3eddd',
    paperRaised: '#faf6e9',
    paperMuted: '#e8e1cf',
    ink: '#302a33',
    inkMuted: '#665e6a',
    rule: '#746a75',
    ruleMuted: '#b8adae',
    aubergine: '#4d2d57',
    periwinkle: '#7f83ba',
    periwinkleWash: '#dfdef0',
    olive: '#62663b',
    oliveWash: '#dfe0c6',
    vermilion: '#a53d2c',
    vermilionWash: '#f0d6cc',
  },
  font: {
    display:
      '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, Georgia, serif',
    ui: 'Pretendard, "IBM Plex Sans KR", "Apple SD Gothic Neo", system-ui, sans-serif',
    data: '"IBM Plex Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
  fontSize: {
    caption: '0.6875rem',
    label: '0.75rem',
    body: '0.8125rem',
    data: '0.75rem',
    headingSm: '1rem',
    headingMd: '1.375rem',
    headingLg: '2.125rem',
  },
  lineHeight: {
    tight: '1.12',
    compact: '1.3',
    body: '1.55',
  },
  space: {
    none: '0',
    xxs: '0.125rem',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    xxl: '2rem',
  },
  size: {
    control: '1.875rem',
    row: '1.5rem',
    ruleGap: '0.125rem',
  },
  radius: {
    none: '0',
    subtle: '1px',
  },
  border: {
    hairline: '1px',
  },
} as const;

export const primitiveTokens = {
  palette: tokens.color,
  fontFamily: tokens.font,
  fontSize: tokens.fontSize,
  lineHeight: tokens.lineHeight,
  space: tokens.space,
  dimension: tokens.size,
  radius: tokens.radius,
  borderWidth: tokens.border,
} as const;

export type Space = keyof typeof tokens.space;
