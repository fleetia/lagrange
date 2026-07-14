import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { ThemeRoot } from './ThemeRoot';
import { themeClass } from './theme.css';

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
    expect(root.className.includes(themeClass)).toBe(true);
    expect(root.className.includes('consumer-class')).toBe(true);
    expect(root.textContent).toBe('Ledger');
  });

  it('replaces the default theme class without replacing consumer classes', () => {
    render(
      <ThemeRoot
        className="consumer-class"
        data-testid="custom-theme-root"
        themeClassName="custom-theme"
      />,
    );

    const root = screen.getByTestId('custom-theme-root');

    expect(root.className.includes('custom-theme')).toBe(true);
    expect(root.className.includes('consumer-class')).toBe(true);
    expect(root.className.includes(themeClass)).toBe(false);
  });

  it('can inherit a theme from an ancestor', () => {
    render(<ThemeRoot data-testid="inherited-theme-root" themeClassName={null} />);

    expect(
      screen.getByTestId('inherited-theme-root').className.includes(themeClass),
    ).toBe(false);
  });
});
