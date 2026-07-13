import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Rule } from './Rule';

afterEach(cleanup);

describe('Rule', () => {
  it('renders a semantic horizontal boundary by default', () => {
    render(<Rule />);

    const separator = screen.getByRole('separator');

    expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
    expect(separator.getAttribute('data-variant')).toBe('boundary');
  });

  it('exposes structural vertical rules without changing semantics', () => {
    render(<Rule orientation="vertical" variant="structural" />);

    const separator = screen.getByRole('separator');

    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
    expect(separator.getAttribute('data-variant')).toBe('structural');
  });
});
