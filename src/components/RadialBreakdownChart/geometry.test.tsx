import { describe, expect, it } from 'vitest';

import {
  distributeLeaderLabels,
  getAnnularSegmentPath,
  getCardinalTickIndexes,
  getRingRadii,
  getSegmentAngles,
  polarToCartesian,
} from './geometry';

describe('RadialBreakdownChart geometry', () => {
  it('turns proportional values into a complete sequence of angles', () => {
    const angles = getSegmentAngles([1, 1, 2]);

    expect(angles[0]).toEqual({
      endAngle: 0,
      index: 0,
      midAngle: -45,
      startAngle: -90,
    });
    expect(angles[2]?.endAngle).toBe(270);
    expect(
      (angles[2]?.endAngle ?? 0) - (angles[0]?.startAngle ?? 0),
    ).toBe(360);
  });

  it('builds a stable annular path for a full-ring segment', () => {
    const path = getAnnularSegmentPath(200, 200, 60, 100, -90, 270);

    expect(path).not.toBe('');
    expect(path).not.toContain('NaN');
    expect(path).toContain('A 100 100');
    expect(path.endsWith('Z')).toBe(true);
  });

  it('allocates multiple rings from the outside inward with a fixed gap', () => {
    expect(getRingRadii(2, 60, 120, 4)).toEqual([
      { innerRadius: 92, outerRadius: 120 },
      { innerRadius: 60, outerRadius: 88 },
    ]);
    expect(getRingRadii(0, 60, 120, 4)).toEqual([]);
  });

  it('maps arbitrary tick counts onto the four cardinal positions', () => {
    expect([...getCardinalTickIndexes(5)]).toEqual([0, 1, 3, 4]);
    expect([...getCardinalTickIndexes(10)]).toEqual([0, 3, 5, 8]);
    expect([...getCardinalTickIndexes(0)]).toEqual([]);
  });

  it('keeps external labels apart independently on each side', () => {
    const layouts = distributeLeaderLabels(
      [
        { id: 'left-a', side: 'left', source: { x: 1, y: 1 }, targetY: 100 },
        { id: 'left-b', side: 'left', source: { x: 1, y: 2 }, targetY: 105 },
        { id: 'right-a', side: 'right', source: { x: 2, y: 1 }, targetY: 100 },
      ],
      60,
      180,
      32,
    );
    const leftLayouts = layouts.filter(({ side }) => side === 'left');

    expect(
      (leftLayouts[1]?.labelY ?? 0) - (leftLayouts[0]?.labelY ?? 0),
    ).toBeGreaterThanOrEqual(32);
    expect(layouts.find(({ id }) => id === 'right-a')?.labelY).toBe(100);
  });

  it('keeps widely separated label targets inside the available frame', () => {
    const layouts = distributeLeaderLabels(
      [
        { id: 'top', side: 'left', source: { x: 1, y: 1 }, targetY: 30 },
        { id: 'bottom', side: 'left', source: { x: 1, y: 2 }, targetY: 360 },
      ],
      96,
      274,
      118,
    );

    expect(layouts.find(({ id }) => id === 'top')?.labelY).toBe(96);
    expect(layouts.find(({ id }) => id === 'bottom')?.labelY).toBe(274);
  });

  it('places polar points using the chart angle convention', () => {
    expect(polarToCartesian(100, 100, 50, -90).x).toBeCloseTo(100);
    expect(polarToCartesian(100, 100, 50, -90).y).toBeCloseTo(50);
  });
});
