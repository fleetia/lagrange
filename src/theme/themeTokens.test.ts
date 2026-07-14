import { describe, expect, it } from 'vitest';

import {
  componentTokens,
  createThemeTokens,
  lagrangeTheme,
  semanticTokens,
} from './themeTokens';

describe('createThemeTokens', () => {
  it('returns a complete default theme without overrides', () => {
    expect(createThemeTokens()).toEqual(lagrangeTheme);
  });

  it('merges nested overrides while preserving default token branches', () => {
    const theme = createThemeTokens({
      semantic: {
        color: {
          surface: { canvas: '#f6f2e7' },
        },
      },
      component: {
        button: { primaryBackground: '#294f59' },
      },
    });

    expect(theme.semantic.color.surface.canvas).toBe('#f6f2e7');
    expect(theme.semantic.color.surface.raised).toBe(
      semanticTokens.color.surface.raised,
    );
    expect(theme.component.button.primaryBackground).toBe('#294f59');
    expect(theme.component.button.primaryText).toBe(
      componentTokens.button.primaryText,
    );
  });

  it('does not mutate the supplied override branches', () => {
    const surfaceOverride = { canvas: '#f6f2e7' };

    const theme = createThemeTokens({
      semantic: { color: { surface: surfaceOverride } },
    });

    expect(surfaceOverride).toEqual({ canvas: '#f6f2e7' });
    expect(theme.semantic.color.surface).not.toBe(surfaceOverride);
  });

  it('keeps defaults when an optional override is explicitly undefined', () => {
    const theme = createThemeTokens({
      semantic: {
        color: {
          content: { accent: undefined },
        },
      },
    });

    expect(theme.semantic.color.content.accent).toBe(
      semanticTokens.color.content.accent,
    );
  });
});
