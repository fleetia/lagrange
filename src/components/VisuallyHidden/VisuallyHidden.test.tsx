import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { VisuallyHidden } from './VisuallyHidden';

afterEach(cleanup);

describe('VisuallyHidden', () => {
  it('keeps hidden text in an interactive control accessible', () => {
    render(
      <button type="button">
        <span aria-hidden="true">×</span>
        <VisuallyHidden>닫기</VisuallyHidden>
      </button>,
    );

    expect(screen.getByRole('button', { name: '닫기' })).toBeDefined();
  });

  it('forwards native attributes and marks focus-reveal behavior', () => {
    render(
      <VisuallyHidden className="consumer-class" isFocusable tabIndex={0}>
        본문으로 건너뛰기
      </VisuallyHidden>,
    );

    const content = screen.getByText('본문으로 건너뛰기');

    expect(content.getAttribute('data-focusable')).toBe('true');
    expect(content.getAttribute('tabindex')).toBe('0');
    expect(content.className).toContain('consumer-class');
  });
});
