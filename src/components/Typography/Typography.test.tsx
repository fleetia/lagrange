import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Heading, Text } from './Typography';

afterEach(cleanup);

describe('Typography', () => {
  it('renders data text with its requested semantic element', () => {
    render(
      <Text as="p" variant="data" tone="positive">
        ₩ 28,450,000
      </Text>,
    );

    const text = screen.getByText('₩ 28,450,000');

    expect(text.tagName).toBe('P');
    expect(text.getAttribute('data-variant')).toBe('data');
    expect(text.getAttribute('data-tone')).toBe('positive');
  });

  it('keeps heading hierarchy independent from visual style', () => {
    render(
      <Heading level={3} variant="display">
        Lagrange
      </Heading>,
    );

    const heading = screen.getByRole('heading', { level: 3 });

    expect(heading.getAttribute('data-variant')).toBe('display');
  });
});
