import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Section } from './Section';

afterEach(cleanup);

describe('Section', () => {
  it('renders a labelled semantic section with default rhythm', () => {
    render(<Section aria-label="자산 요약">월간 자산 구성</Section>);

    const section = screen.getByRole('region', { name: '자산 요약' });

    expect(section.textContent).toBe('월간 자산 구성');
    expect(section.dataset.boundary).toBe('none');
    expect(section.dataset.spacing).toBe('default');
  });

  it('exposes structural boundary and compact spacing without replacing native props', () => {
    render(
      <Section
        boundary="structural"
        className="consumer-section"
        data-testid="section"
        spacing="compact"
      >
        최근 거래
      </Section>,
    );

    const section = screen.getByTestId('section');

    expect(section.dataset.boundary).toBe('structural');
    expect(section.dataset.spacing).toBe('compact');
    expect(section.className.includes('consumer-section')).toBe(true);
  });
});
