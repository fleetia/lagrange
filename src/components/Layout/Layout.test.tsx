import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Inline, Stack } from './Layout';

afterEach(cleanup);

describe('Layout', () => {
  it('renders vertical content as a Stack', () => {
    render(<Stack data-testid="layout">Content</Stack>);

    expect(screen.getByTestId('layout').getAttribute('data-layout')).toBe(
      'stack',
    );
  });

  it('renders wrapping horizontal content as an Inline', () => {
    render(
      <Inline data-testid="layout" wrap={false}>
        Content
      </Inline>,
    );

    expect(screen.getByTestId('layout').getAttribute('data-layout')).toBe(
      'inline',
    );
  });
});
