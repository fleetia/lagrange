import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Icon } from './Icon';

afterEach(cleanup);

describe('Icon', () => {
  it('hides a decorative icon from assistive technology by default', () => {
    const { container } = render(
      <Icon data-testid="icon">
        <path d="M4 12h16" />
      </Icon>,
    );
    const icon = container.querySelector('svg');

    expect(icon?.getAttribute('aria-hidden')).toBe('true');
    expect(icon?.getAttribute('focusable')).toBe('false');
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('gives an informative icon an accessible image name', () => {
    render(
      <Icon decorative={false} label="저장 완료" size="lg">
        <path d="m5 12 4 4L19 6" />
      </Icon>,
    );

    const icon = screen.getByRole('img', { name: '저장 완료' });

    expect(icon.getAttribute('data-size')).toBe('lg');
  });

  it('keeps informative icon semantics authoritative', () => {
    const conflictingSvgProps = {
      'aria-hidden': true,
      focusable: 'true',
      role: 'presentation',
    };

    render(
      <Icon
        {...conflictingSvgProps}
        decorative={false}
        label="저장 완료"
      >
        <path d="m5 12 4 4L19 6" />
      </Icon>,
    );

    const icon = screen.getByRole('img', { name: '저장 완료' });

    expect(icon.hasAttribute('aria-hidden')).toBe(false);
    expect(icon.getAttribute('focusable')).toBe('false');
  });

  it('forwards SVG presentation attributes and custom classes', () => {
    const { container } = render(
      <Icon className="consumer-class" strokeLinecap="round" viewBox="0 0 16 16">
        <path d="M2 8h12" />
      </Icon>,
    );
    const icon = container.querySelector('svg');

    expect(icon?.classList.contains('consumer-class')).toBe(true);
    expect(icon?.getAttribute('stroke-linecap')).toBe('round');
    expect(icon?.getAttribute('viewBox')).toBe('0 0 16 16');
  });
});
