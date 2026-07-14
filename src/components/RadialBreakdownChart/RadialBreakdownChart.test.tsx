import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { RadialBreakdownChart } from './RadialBreakdownChart';
import type {
  RadialBreakdownRing,
  RadialBreakdownSegment,
} from './types';

const SEGMENTS: readonly RadialBreakdownSegment[] = [
  { color: '#7f83ba', id: 'alpha', label: 'Alpha', value: 60 },
  { color: '#62663b', detail: '40 units', id: 'beta', label: 'Beta', value: 40 },
];

afterEach(cleanup);

describe('RadialBreakdownChart', () => {
  it('renders a responsive labelled chart with ticks, leaders and center content', () => {
    const { container } = render(
      <RadialBreakdownChart
        centerContent={<strong>Total 100</strong>}
        className="consumer-class"
        description="Two-part distribution"
        outerTickCount={12}
        segments={SEGMENTS}
        title="Distribution"
      />,
    );

    const chart = screen.getByRole('img', { name: 'Distribution' });

    expect(chart.getAttribute('aria-describedby')).toContain(
      'lagrange-radial-description',
    );
    expect(screen.getByText('Total 100')).toBeDefined();
    expect(container.querySelector('figure')?.className).toContain('consumer-class');
    expect(container.querySelectorAll('[data-segment-id]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-tick="true"]')).toHaveLength(12);
    expect(screen.getAllByText('Alpha').length).toBeGreaterThan(1);
    expect(within(chart).getByText('40%')).toBeDefined();
    expect(within(chart).getByText('40 units')).toBeDefined();
  });

  it('supports multiple rings and exposes a screen-reader data table', () => {
    const rings: readonly RadialBreakdownRing[] = [
      { id: 'outer', label: 'Outer', segments: SEGMENTS },
      {
        id: 'inner',
        label: 'Inner',
        segments: [
          { color: '#a53d2c', id: 'gamma', label: 'Gamma', value: 25 },
          { color: '#dfdef0', id: 'delta', label: 'Delta', value: 75 },
        ],
      },
    ];
    const { container } = render(
      <RadialBreakdownChart rings={rings} title="Nested distribution" />,
    );

    expect(container.querySelectorAll('[data-segment-id]')).toHaveLength(4);
    expect(screen.getByRole('table', { name: 'Nested distribution data' })).toBeDefined();
    expect(screen.getByRole('rowheader', { name: 'Gamma' })).toBeDefined();
    expect(screen.getByRole('cell', { name: '25%' })).toBeDefined();
  });

  it('scopes pigment grain patterns to each chart instance', () => {
    const { container } = render(
      <>
        <RadialBreakdownChart segments={SEGMENTS} title="First distribution" />
        <RadialBreakdownChart segments={SEGMENTS} title="Second distribution" />
      </>,
    );
    const patterns = container.querySelectorAll('[data-pigment-grain-pattern]');
    const patternIds = [...patterns].map(({ id }) => id);
    const textureFills = new Set(
      [...container.querySelectorAll('[data-segment-texture-id]')]
        .map((texture) => texture.getAttribute('fill')),
    );

    expect(patterns).toHaveLength(2);
    expect(new Set(patternIds).size).toBe(2);

    for (const patternId of patternIds) {
      expect(textureFills.has(`url(#${patternId})`)).toBe(true);
    }
  });

  it('uses one non-interactive chart summary and an accessible data table', () => {
    const { container } = render(
      <RadialBreakdownChart
        segments={SEGMENTS}
        title="Distribution summary"
      />,
    );
    const segments = container.querySelectorAll('[data-segment-id]');

    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getByRole('table', { name: 'Distribution summary data' })).toBeDefined();
    expect(segments).toHaveLength(2);
    expect(segments[0]?.getAttribute('aria-hidden')).toBe('true');
    expect(segments[0]?.getAttribute('role')).toBeNull();
    expect(segments[0]?.getAttribute('tabindex')).toBeNull();
  });

  it('keeps the accessible data table when visual labels are hidden', () => {
    render(
      <RadialBreakdownChart
        segments={SEGMENTS}
        showLabels={false}
        title="Compact distribution"
      />,
    );

    const chart = screen.getByRole('img', { name: 'Compact distribution' });

    expect(within(chart).queryByText('Alpha')).toBeNull();
    expect(screen.getByRole('rowheader', { name: 'Alpha' })).toBeDefined();
  });

  it('supports an explicit leader angle without changing segment values', () => {
    const { container } = render(
      <RadialBreakdownChart
        segments={[
          {
            color: '#7f83ba',
            id: 'alpha',
            label: 'Alpha',
            labelAngle: 180,
            value: 100,
          },
        ]}
        title="Directed label"
      />,
    );

    expect(
      container.querySelector('[data-label-id="alpha"]')
        ?.getAttribute('data-label-side'),
    ).toBe('left');
    expect(screen.getByRole('cell', { name: '100' })).toBeDefined();
  });

  it('supports localized data table labels', () => {
    render(
      <RadialBreakdownChart
        dataTableLabels={{
          caption: '분포 데이터',
          detail: '상세',
          label: '항목',
          series: '계열',
          value: '값',
        }}
        segments={SEGMENTS}
        title="분포"
      />,
    );

    expect(screen.getByRole('table', { name: '분포 데이터' })).toBeDefined();
    expect(screen.getByRole('columnheader', { name: '계열' })).toBeDefined();
    expect(screen.getByRole('columnheader', { name: '항목' })).toBeDefined();
    expect(screen.getByRole('columnheader', { name: '상세' })).toBeDefined();
    expect(screen.getByRole('columnheader', { name: '값' })).toBeDefined();
  });

  it('shows the fallback instead of an orphaned center for too many rings', () => {
    const rings: readonly RadialBreakdownRing[] = Array.from(
      { length: 17 },
      (_, index) => ({
        id: `ring-${index}`,
        label: `Ring ${index}`,
        segments: [
          {
            color: '#7f83ba',
            id: `segment-${index}`,
            label: `Segment ${index}`,
            value: 1,
          },
        ],
      }),
    );
    const { container } = render(
      <RadialBreakdownChart
        centerContent={<strong>Center</strong>}
        emptyState="Too many series"
        rings={rings}
        title="Dense distribution"
      />,
    );

    expect(screen.getByRole('status').textContent).toBe('Too many series');
    expect(screen.queryByText('Center')).toBeNull();
    expect(container.querySelectorAll('[data-segment-id]')).toHaveLength(0);
    expect(screen.getByRole('table', { name: 'Dense distribution data' })).toBeDefined();
  });

  it('shows a clear empty state and ignores non-positive values', () => {
    const { container } = render(
      <RadialBreakdownChart
        emptyState="Nothing to compare"
        segments={[
          { color: '#7f83ba', id: 'zero', label: 'Zero', value: 0 },
          { color: '#62663b', id: 'negative', label: 'Negative', value: -2 },
        ]}
        title="Empty distribution"
      />,
    );

    expect(screen.getByRole('status').textContent).toBe('Nothing to compare');
    expect(container.querySelectorAll('[data-segment-id]')).toHaveLength(0);
  });
});
