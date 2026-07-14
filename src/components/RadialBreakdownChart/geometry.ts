export type Point = {
  x: number;
  y: number;
};

export type SegmentAngles = {
  endAngle: number;
  index: number;
  midAngle: number;
  startAngle: number;
};

export type RingRadii = {
  innerRadius: number;
  outerRadius: number;
};

export type LeaderSide = 'left' | 'right';

export type LeaderCandidate = {
  id: string;
  side: LeaderSide;
  source: Point;
  targetY: number;
};

export type LeaderLayout = LeaderCandidate & {
  labelY: number;
};

const FULL_CIRCLE = 360;
const MAX_ARC = 359.999;

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number,
): Point {
  const radians = (angle * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians),
  };
}

export function getSegmentAngles(
  values: readonly number[],
  startAngle = -90,
): readonly SegmentAngles[] {
  const safeValues = values.map((value) =>
    Number.isFinite(value) && value > 0 ? value : 0,
  );
  const total = safeValues.reduce((sum, value) => sum + value, 0);
  let currentAngle = startAngle;

  if (total === 0) {
    return safeValues.map((_, index) => ({
      endAngle: startAngle,
      index,
      midAngle: startAngle,
      startAngle,
    }));
  }

  return safeValues.map((value, index) => {
    const sweep = (value / total) * FULL_CIRCLE;
    const angles = {
      endAngle: currentAngle + sweep,
      index,
      midAngle: currentAngle + sweep / 2,
      startAngle: currentAngle,
    };

    currentAngle += sweep;

    return angles;
  });
}

export function getAnnularSegmentPath(
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const sweep = Math.max(0, Math.min(endAngle - startAngle, MAX_ARC));

  if (sweep === 0 || innerRadius < 0 || outerRadius <= innerRadius) {
    return '';
  }

  const resolvedEndAngle = startAngle + sweep;
  const outerStart = polarToCartesian(
    centerX,
    centerY,
    outerRadius,
    startAngle,
  );
  const outerEnd = polarToCartesian(
    centerX,
    centerY,
    outerRadius,
    resolvedEndAngle,
  );
  const innerEnd = polarToCartesian(
    centerX,
    centerY,
    innerRadius,
    resolvedEndAngle,
  );
  const innerStart = polarToCartesian(
    centerX,
    centerY,
    innerRadius,
    startAngle,
  );
  const largeArcFlag = sweep > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

export function getRingRadii(
  ringCount: number,
  innerRadius: number,
  outerRadius: number,
  gap: number,
): readonly RingRadii[] {
  const safeCount = Math.max(0, Math.floor(ringCount));
  const availableWidth = outerRadius - innerRadius - gap * (safeCount - 1);

  if (safeCount === 0 || availableWidth <= 0) {
    return [];
  }

  const ringWidth = availableWidth / safeCount;

  return Array.from({ length: safeCount }, (_, index) => {
    const resolvedOuterRadius = outerRadius - index * (ringWidth + gap);

    return {
      innerRadius: resolvedOuterRadius - ringWidth,
      outerRadius: resolvedOuterRadius,
    };
  });
}

export function getCardinalTickIndexes(
  tickCount: number,
): ReadonlySet<number> {
  const safeCount = Number.isFinite(tickCount)
    ? Math.max(0, Math.floor(tickCount))
    : 0;

  if (safeCount === 0) {
    return new Set();
  }

  return new Set(
    Array.from(
      { length: 4 },
      (_, index) => Math.round((index * safeCount) / 4) % safeCount,
    ),
  );
}

function distributeSide(
  candidates: readonly LeaderCandidate[],
  minY: number,
  maxY: number,
  minGap: number,
): readonly LeaderLayout[] {
  const sortedCandidates = [...candidates].sort(
    (first, second) => first.targetY - second.targetY,
  );
  const effectiveGap = sortedCandidates.length < 2
    ? 0
    : Math.min(minGap, (maxY - minY) / (sortedCandidates.length - 1));
  let previousY = minY - effectiveGap;
  const forwardLayouts = sortedCandidates.map((candidate) => {
    const clampedTarget = Math.min(maxY, Math.max(minY, candidate.targetY));
    const labelY = Math.max(clampedTarget, previousY + effectiveGap);

    previousY = labelY;

    return { ...candidate, labelY };
  });
  let nextY = maxY + effectiveGap;

  return [...forwardLayouts]
    .reverse()
    .map((layout) => {
      const labelY = Math.min(layout.labelY, nextY - effectiveGap);

      nextY = labelY;

      return { ...layout, labelY };
    })
    .reverse();
}

export function distributeLeaderLabels(
  candidates: readonly LeaderCandidate[],
  minY: number,
  maxY: number,
  minGap: number,
): readonly LeaderLayout[] {
  const leftCandidates = candidates.filter(({ side }) => side === 'left');
  const rightCandidates = candidates.filter(({ side }) => side === 'right');

  return [
    ...distributeSide(leftCandidates, minY, maxY, minGap),
    ...distributeSide(rightCandidates, minY, maxY, minGap),
  ];
}
