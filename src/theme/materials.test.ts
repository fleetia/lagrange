import { describe, expect, it } from 'vitest';

import { createSelectIndicatorTexture } from './materials';

describe('createSelectIndicatorTexture', () => {
  it('embeds the supplied color in an encoded select indicator', () => {
    const texture = createSelectIndicatorTexture('#214f5d');

    expect(texture.startsWith('url("data:image/svg+xml,')).toBe(true);
    expect(decodeURIComponent(texture)).toContain('stroke="#214f5d"');
  });
});
