import { tokens } from './tokens';

const PAPER_GRAIN_SVG = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">',
  '<defs>',
  '<radialGradient id="wash"><stop stop-color="#6f5e66" stop-opacity=".04"/><stop offset="1" stop-color="#6f5e66" stop-opacity="0"/></radialGradient>',
  '<radialGradient id="lift"><stop stop-color="#fffdf5" stop-opacity=".14"/><stop offset="1" stop-color="#fffdf5" stop-opacity="0"/></radialGradient>',
  '<pattern id="a" width="7" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(7)">',
  '<path fill="#4d2d57" fill-opacity=".095" d="M1.1 2.2h.55v.55h-.55zM5.4 8.3h.35v.35h-.35z"/>',
  '</pattern>',
  '<pattern id="b" width="13" height="17" patternUnits="userSpaceOnUse" patternTransform="rotate(-11)">',
  '<path fill="#fffdf6" fill-opacity=".28" d="M2.4 4.1h.7v.7h-.7zM10.1 13.2h.45v.45h-.45z"/>',
  '<path fill="#756269" fill-opacity=".075" d="M6.2 9.1h1.05v.35H6.2z"/>',
  '</pattern>',
  '<pattern id="c" width="19" height="23" patternUnits="userSpaceOnUse" patternTransform="rotate(19)">',
  '<path fill="#3f3440" fill-opacity=".065" d="M3.2 6.4h1.25v.45H3.2zM15.1 17.8h.55v.9h-.55z"/>',
  '<path fill="#fffaf0" fill-opacity=".22" d="M9.2 2.1h.4v.4h-.4z"/>',
  '</pattern>',
  '<pattern id="d" width="43" height="47" patternUnits="userSpaceOnUse" patternTransform="rotate(-13)">',
  '<circle cx="9" cy="11" r="5" fill="url(#wash)"/><circle cx="34" cy="37" r="4" fill="url(#lift)"/>',
  '</pattern>',
  '</defs>',
  '<rect width="128" height="128" fill="url(#a)"/>',
  '<rect width="128" height="128" fill="url(#b)"/>',
  '<rect width="128" height="128" fill="url(#c)"/>',
  '<rect width="128" height="128" fill="url(#d)"/>',
  '</svg>',
].join('');

export const paperGrainTexture = `url("data:image/svg+xml,${encodeURIComponent(PAPER_GRAIN_SVG)}")`;

export const createSelectIndicatorTexture = (color: string): string => {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8">',
    `<path d="m1 1 5 5 5-5" fill="none" stroke="${color}" stroke-width="1.25"/>`,
    '</svg>',
  ].join('');

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

export const selectIndicatorTexture = createSelectIndicatorTexture(
  tokens.color.aubergine,
);
