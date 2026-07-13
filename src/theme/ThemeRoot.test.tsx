import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { ThemeRoot } from './ThemeRoot';

afterEach(cleanup);

describe('ThemeRoot', () => {
  it('renders a theme boundary while preserving native div props', () => {
    render(
      <ThemeRoot className="consumer-class" data-testid="theme-root">
        Ledger
      </ThemeRoot>,
    );

    const root = screen.getByTestId('theme-root');

    expect(root.tagName).toBe('DIV');
    expect(root.className.includes('consumer-class')).toBe(true);
    expect(root.textContent).toBe('Ledger');
  });
});
