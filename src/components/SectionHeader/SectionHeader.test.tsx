import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { SectionHeader } from './SectionHeader';

afterEach(cleanup);

describe('SectionHeader', () => {
  it('connects editorial copy, aside content and rule hierarchy', () => {
    render(
      <SectionHeader
        aside={<button type="button">기간 변경</button>}
        description="계좌와 투자 자산을 합산한 현재 구성입니다."
        eyebrow="Assets · 01"
        headingId="assets-heading"
        headingLevel={3}
        rule="structural"
        title="자산 구성"
      />,
    );

    const heading = screen.getByRole('heading', {
      level: 3,
      name: '자산 구성',
    });

    expect(heading.id).toBe('assets-heading');
    expect(screen.getByText('Assets · 01')).toBeDefined();
    expect(screen.getByText('계좌와 투자 자산을 합산한 현재 구성입니다.')).toBeDefined();
    expect(screen.getByRole('button', { name: '기간 변경' })).toBeDefined();
    expect(screen.getByRole('separator').dataset.variant).toBe('structural');
  });

  it('omits optional copy and separator in its minimal state', () => {
    render(<SectionHeader rule="none" title="최근 거래" />);

    expect(screen.getByRole('heading', { level: 2 })).toBeDefined();
    expect(screen.queryByRole('separator')).toBeNull();
  });
});
