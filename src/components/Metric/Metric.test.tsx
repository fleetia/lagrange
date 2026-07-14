import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Metric } from './Metric';

afterEach(cleanup);

describe('Metric', () => {
  it('renders one semantic term and definition with supporting detail', () => {
    const { container } = render(
      <Metric
        detail="전월 대비 +4.2%"
        label="총 자산"
        value="₩ 28,450,000"
      />,
    );

    const metric = container.querySelector('dl');

    expect(metric).not.toBeNull();
    expect(metric?.querySelector('dt')?.textContent).toBe('총 자산');
    expect(metric?.querySelector('dd')?.textContent).toContain('₩ 28,450,000');
    expect(screen.getByText('전월 대비 +4.2%')).toBeDefined();
  });

  it('exposes visual tone, size and alignment while forwarding native props', () => {
    render(
      <Metric
        align="end"
        aria-label="월 지출"
        className="consumer-metric"
        data-testid="metric"
        label="지출"
        size="prominent"
        tone="critical"
        value="₩ 1,248,500"
      />,
    );

    const metric = screen.getByTestId('metric');

    expect(metric.getAttribute('aria-label')).toBe('월 지출');
    expect(metric.dataset.size).toBe('prominent');
    expect(metric.dataset.tone).toBe('critical');
    expect(metric.className.includes('consumer-metric')).toBe(true);
  });
});
