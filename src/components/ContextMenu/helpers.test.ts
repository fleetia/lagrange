import { describe, expect, it } from 'vitest';

import { getClampedMenuPosition } from './helpers';

describe('getClampedMenuPosition', () => {
  it('keeps an in-bounds pointer anchor unchanged', () => {
    expect(
      getClampedMenuPosition(
        { x: 120, y: 80 },
        { height: 160, width: 200 },
        { height: 768, width: 1024 },
      ),
    ).toEqual({ left: 120, top: 80 });
  });

  it('clamps every edge with four pixels of viewport padding', () => {
    expect(
      getClampedMenuPosition(
        { x: 390, y: -20 },
        { height: 180, width: 160 },
        { height: 320, width: 400 },
      ),
    ).toEqual({ left: 236, top: 4 });
  });

  it('pins an oversized menu to the leading viewport padding', () => {
    expect(
      getClampedMenuPosition(
        { x: 80, y: 90 },
        { height: 400, width: 500 },
        { height: 320, width: 400 },
      ),
    ).toEqual({ left: 4, top: 4 });
  });
});
