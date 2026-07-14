import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef, useId } from 'react';
import clsx from 'clsx';

import {
  distributeLeaderLabels,
  getAnnularSegmentPath,
  getCardinalTickIndexes,
  getRingRadii,
  getSegmentAngles,
  polarToCartesian,
  type LeaderCandidate,
  type RingRadii,
} from './geometry';
import type {
  RadialBreakdownChartDataTableLabels,
  RadialBreakdownRing,
  RadialBreakdownSegment,
} from './types';
import * as styles from './RadialBreakdownChart.css';

const VIEWBOX_WIDTH = 712;
const VIEWBOX_HEIGHT = 398;
const CENTER_X = 392;
const CENTER_Y = 199;
const OUTER_RADIUS = 136;
const INNER_RADIUS = 88;
const ORBIT_RADIUS = 176;
const TICK_INNER_RADIUS = 146;
const TICK_OUTER_RADIUS = 153;
const RING_GAP = 0;
const MAX_RING_COUNT = 16;
const LABEL_MIN_Y = 96;
const LABEL_MAX_Y = 274;
const LABEL_MIN_GAP = 118;
const CARDINAL_MARKERS = [
  { angle: -90, tone: 'accent' },
  { angle: 0, tone: 'olive' },
  { angle: 90, tone: 'accent' },
  { angle: 180, tone: 'accent' },
] as const;
const SATELLITE_ANGLES = [-126, -54, 54, 126] as const;
const DEFAULT_DATA_TABLE_LABELS: Omit<
  RadialBreakdownChartDataTableLabels,
  'caption'
> = {
  detail: 'Detail',
  label: 'Label',
  series: 'Series',
  value: 'Value',
};

type LabelLayout = {
  detail?: string;
  id: string;
  label: string;
  labelY: number;
  side: 'left' | 'right';
  source: { x: number; y: number };
  value: string;
};

type RadialBreakdownChartDataProps =
  | {
    rings: readonly RadialBreakdownRing[];
    segments?: never;
  }
  | {
    rings?: never;
    segments?: readonly RadialBreakdownSegment[];
  };

export type RadialBreakdownChartProps = Omit<
  ComponentPropsWithoutRef<'figure'>,
  'children' | 'title'
> & {
  centerContent?: ReactNode;
  dataTableLabels?: Partial<RadialBreakdownChartDataTableLabels>;
  description?: string;
  emptyState?: ReactNode;
  formatValue?: (value: number, total: number) => string;
  outerTickCount?: number;
  showLabels?: boolean;
  startAngle?: number;
  title: string;
} & RadialBreakdownChartDataProps;

function defaultFormatValue(value: number, total: number): string {
  if (total <= 0) {
    return '0%';
  }

  return `${Math.round((value / total) * 100)}%`;
}

function getValidSegments(
  segments: readonly RadialBreakdownSegment[],
): readonly RadialBreakdownSegment[] {
  return segments.filter(
    ({ value }) => Number.isFinite(value) && value > 0,
  );
}

function getTotal(segments: readonly RadialBreakdownSegment[]): number {
  return segments.reduce((sum, { value }) => sum + value, 0);
}

function getBoundaryRadii(
  ringRadii: readonly RingRadii[],
): readonly number[] {
  const singleRing = ringRadii[0];

  if (ringRadii.length === 1 && singleRing) {
    const bandWidth = (singleRing.outerRadius - singleRing.innerRadius) / 3;

    return [
      singleRing.innerRadius,
      singleRing.innerRadius + bandWidth,
      singleRing.innerRadius + bandWidth * 2,
      singleRing.outerRadius,
    ];
  }

  return [...new Set(
    ringRadii.flatMap(({ innerRadius, outerRadius }) => [
      innerRadius,
      outerRadius,
    ]),
  )].sort((first, second) => first - second);
}

function getAccessibleDetail(
  segment: RadialBreakdownSegment,
  total: number,
  formatValue: (value: number, total: number) => string,
): string {
  const value = formatValue(segment.value, total);

  return segment.detail ? `${value} · ${segment.detail}` : value;
}

export const RadialBreakdownChart = forwardRef<
  HTMLElement,
  RadialBreakdownChartProps
>(
  (
    {
      centerContent,
      className,
      dataTableLabels,
      description,
      emptyState = '표시할 데이터가 없습니다.',
      formatValue = defaultFormatValue,
      outerTickCount = 72,
      rings,
      segments = [],
      showLabels = true,
      startAngle = -90,
      title,
      ...figureProps
    },
    ref,
  ): ReactElement => {
    const generatedId = useId();
    const pigmentPatternId = `lagrange-radial-pigment-${generatedId.replace(/:/g, '')}`;
    const titleId = `lagrange-radial-title-${generatedId}`;
    const descriptionId = description
      ? `lagrange-radial-description-${generatedId}`
      : undefined;
    const normalizedRings: readonly RadialBreakdownRing[] = rings?.length
      ? rings
      : [{ id: 'default', label: title, segments }];
    const validRings: readonly RadialBreakdownRing[] = normalizedRings
      .map((ring) => ({
        ...ring,
        segments: getValidSegments(ring.segments),
      }))
      .filter((ring) => ring.segments.length > 0);
    const resolvedStartAngle = Number.isFinite(startAngle) ? startAngle : -90;
    const ringRadii = validRings.length <= MAX_RING_COUNT
      ? getRingRadii(
        validRings.length,
        INNER_RADIUS,
        OUTER_RADIUS,
        RING_GAP,
      )
      : [];
    const hasRenderableData =
      validRings.length > 0 && ringRadii.length === validRings.length;
    const boundaryRadii = hasRenderableData
      ? getBoundaryRadii(ringRadii)
      : [];
    const safeTickCount = Number.isFinite(outerTickCount)
      ? Math.min(120, Math.max(0, Math.floor(outerTickCount)))
      : 0;
    const majorTickIndexes = getCardinalTickIndexes(safeTickCount);
    const outerRing = hasRenderableData ? validRings[0] : undefined;
    const outerRingTotal = outerRing ? getTotal(outerRing.segments) : 0;
    const outerAngles = outerRing
      ? getSegmentAngles(
        outerRing.segments.map(({ value }) => value),
        resolvedStartAngle,
      )
      : [];
    const leaderCandidates: readonly LeaderCandidate[] = outerRing
      ? outerRing.segments.map((segment, index) => {
        const angles = outerAngles[index];
        const midAngle = Number.isFinite(segment.labelAngle)
          ? segment.labelAngle ?? -90
          : angles?.midAngle ?? -90;
        const source = polarToCartesian(
          CENTER_X,
          CENTER_Y,
          OUTER_RADIUS + 2,
          midAngle,
        );
        const target = polarToCartesian(
          CENTER_X,
          CENTER_Y,
          OUTER_RADIUS + 15,
          midAngle,
        );

        return {
          id: segment.id,
          side: Math.cos((midAngle * Math.PI) / 180) < 0 ? 'left' : 'right',
          source,
          targetY: target.y,
        };
      })
      : [];
    const distributedLabels = distributeLeaderLabels(
      leaderCandidates,
      LABEL_MIN_Y,
      LABEL_MAX_Y,
      LABEL_MIN_GAP,
    );
    const outerSegmentsById = new Map(
      outerRing?.segments.map((segment) => [segment.id, segment]),
    );
    const labelLayouts: readonly LabelLayout[] = outerRing
      ? distributedLabels.map((layout) => {
        const segment = outerSegmentsById.get(layout.id);

        return {
          detail: segment?.detail,
          id: layout.id,
          label: segment?.label ?? '',
          labelY: layout.labelY,
          side: layout.side,
          source: layout.source,
          value: segment
            ? formatValue(segment.value, outerRingTotal)
            : '',
        };
      })
      : [];
    const resolvedDataTableLabels: RadialBreakdownChartDataTableLabels = {
      caption: `${title} data`,
      ...DEFAULT_DATA_TABLE_LABELS,
      ...dataTableLabels,
    };

    return (
      <figure
        ref={ref}
        className={clsx(styles.root, className)}
        {...figureProps}
      >
        <div className={styles.frame}>
          <svg
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            className={styles.svg}
            role="img"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          >
            <title id={titleId}>{title}</title>
            {description ? <desc id={descriptionId}>{description}</desc> : null}

            {hasRenderableData ? (
              <defs>
                <pattern
                  data-pigment-grain-pattern="true"
                  height="17"
                  id={pigmentPatternId}
                  patternTransform="rotate(-8)"
                  patternUnits="userSpaceOnUse"
                  width="13"
                >
                  <circle className={styles.pigmentGrainDark} cx="1.5" cy="2.1" r="0.55" />
                  <circle className={styles.pigmentGrainDark} cx="10.8" cy="4.2" r="0.35" />
                  <circle className={styles.pigmentGrainDark} cx="6.1" cy="12.4" r="0.7" />
                  <circle className={styles.pigmentGrainDark} cx="12.1" cy="15.8" r="0.25" />
                  <circle className={styles.pigmentGrainLight} cx="4.2" cy="7.9" r="0.6" />
                  <circle className={styles.pigmentGrainLight} cx="8.8" cy="15.3" r="0.4" />
                  <path className={styles.pigmentGrainFiber} d="M2.8 14.8h2.2M8.1 8.7h1.6" />
                </pattern>
              </defs>
            ) : null}

            {hasRenderableData ? (
              <circle
                aria-hidden="true"
                className={styles.orbitGuide}
                cx={CENTER_X}
                cy={CENTER_Y}
                r={ORBIT_RADIUS}
              />
            ) : null}

            {hasRenderableData
              ? Array.from({ length: safeTickCount }, (_, index) => {
                const angle = -90 + (index / safeTickCount) * 360;
                const isMajor = majorTickIndexes.has(index);
                const start = polarToCartesian(
                  CENTER_X,
                  CENTER_Y,
                  TICK_INNER_RADIUS,
                  angle,
                );
                const end = polarToCartesian(
                  CENTER_X,
                  CENTER_Y,
                  isMajor ? TICK_OUTER_RADIUS + 2 : TICK_OUTER_RADIUS,
                  angle,
                );

                return (
                  <line
                    aria-hidden="true"
                    className={clsx(styles.tick, isMajor && styles.majorTick)}
                    data-tick="true"
                    key={index}
                    x1={start.x}
                    x2={end.x}
                    y1={start.y}
                    y2={end.y}
                  />
                );
              })
              : null}

            {validRings.map((ring, ringIndex) => {
              const radii = ringRadii[ringIndex];
              const total = getTotal(ring.segments);
              const angles = getSegmentAngles(
                ring.segments.map(({ value }) => value),
                resolvedStartAngle,
              );

              if (!radii || total === 0) {
                return null;
              }

              return ring.segments.map((segment, segmentIndex) => {
                const segmentAngles = angles[segmentIndex];

                if (!segmentAngles) {
                  return null;
                }

                const segmentPath = getAnnularSegmentPath(
                  CENTER_X,
                  CENTER_Y,
                  radii.innerRadius,
                  radii.outerRadius,
                  segmentAngles.startAngle,
                  segmentAngles.endAngle,
                );

                return (
                  <g key={`${ring.id}-${segment.id}`}>
                    <path
                      aria-hidden="true"
                      className={styles.segment}
                      d={segmentPath}
                      data-ring-id={ring.id}
                      data-segment-id={segment.id}
                      fill={segment.color}
                    />
                    <path
                      aria-hidden="true"
                      className={styles.segmentTexture}
                      d={segmentPath}
                      data-segment-texture-id={segment.id}
                      fill={`url(#${pigmentPatternId})`}
                    />
                  </g>
                );
              });
            })}

            {boundaryRadii.map((radius) => (
              <circle
                aria-hidden="true"
                className={styles.ringBoundary}
                cx={CENTER_X}
                cy={CENTER_Y}
                data-ring-boundary="true"
                key={radius}
                r={radius}
              />
            ))}

            {hasRenderableData ? (
              <g aria-hidden="true" className={styles.axis}>
                <line
                  data-axis="horizontal"
                  x1={164}
                  x2={640}
                  y1={CENTER_Y}
                  y2={CENTER_Y}
                />
                <line
                  data-axis="vertical"
                  x1={CENTER_X}
                  x2={CENTER_X}
                  y1={22}
                  y2={376}
                />
              </g>
            ) : null}

            {hasRenderableData ? (
              <>
                <circle
                  aria-hidden="true"
                  className={styles.centerDisk}
                  cx={CENTER_X}
                  cy={CENTER_Y}
                  r={INNER_RADIUS - 1}
                />
                <circle
                  aria-hidden="true"
                  className={styles.centerGuide}
                  cx={CENTER_X}
                  cy={CENTER_Y}
                  r={INNER_RADIUS - 9}
                />
              </>
            ) : null}

            {hasRenderableData
              ? CARDINAL_MARKERS.map(({ angle, tone }) => {
                const point = polarToCartesian(
                  CENTER_X,
                  CENTER_Y,
                  ORBIT_RADIUS,
                  angle,
                );

                return (
                  <circle
                    aria-hidden="true"
                    className={clsx(
                      styles.anchor,
                      tone === 'olive' && styles.oliveAnchor,
                    )}
                    cx={point.x}
                    cy={point.y}
                    data-orbit-anchor={angle}
                    key={angle}
                    r={4.75}
                  />
                );
              })
              : null}

            {hasRenderableData
              ? SATELLITE_ANGLES.map((angle) => {
                const point = polarToCartesian(
                  CENTER_X,
                  CENTER_Y,
                  ORBIT_RADIUS,
                  angle,
                );

                return (
                  <circle
                    aria-hidden="true"
                    className={styles.satellite}
                    cx={point.x}
                    cy={point.y}
                    data-orbit-satellite={angle}
                    key={angle}
                    r={2.6}
                  />
                );
              })
              : null}

            {hasRenderableData && showLabels
              ? labelLayouts.map((layout) => {
                const isLeft = layout.side === 'left';
                const elbowX = isLeft ? 228 : 532;
                const lineEndX = isLeft ? 171 : 570;
                const textX = isLeft ? 120 : 580;
                const labelBaseline = layout.labelY + 3;

                return (
                  <g
                    aria-hidden="true"
                    data-label-id={layout.id}
                    data-label-side={layout.side}
                    key={`label-${layout.id}`}
                  >
                    <polyline
                      className={styles.leader}
                      points={[
                        `${layout.source.x},${layout.source.y}`,
                        `${elbowX},${labelBaseline}`,
                        `${lineEndX},${labelBaseline}`,
                      ].join(' ')}
                    />
                    <circle
                      className={styles.leaderDot}
                      cx={layout.source.x}
                      cy={layout.source.y}
                      r={2.25}
                      stroke={outerSegmentsById.get(layout.id)?.color}
                    />
                    <text
                      className={styles.label}
                      textAnchor="start"
                      x={textX}
                      y={layout.labelY}
                    >
                      {layout.label}
                    </text>
                    <text
                      className={styles.labelValue}
                      textAnchor="start"
                      x={textX}
                      y={layout.labelY + 20}
                    >
                      {layout.value}
                    </text>
                    {layout.detail ? (
                      <text
                        className={styles.detail}
                        textAnchor="start"
                        x={textX}
                        y={layout.labelY + 38}
                      >
                        {layout.detail}
                      </text>
                    ) : null}
                  </g>
                );
              })
              : null}
          </svg>

          {hasRenderableData && centerContent ? (
            <div className={styles.center}>{centerContent}</div>
          ) : null}
          {!hasRenderableData ? (
            <div className={styles.empty} role="status">{emptyState}</div>
          ) : null}
        </div>

        <div className={styles.accessibleData}>
          <table>
            <caption>{resolvedDataTableLabels.caption}</caption>
            <thead>
              <tr>
                <th scope="col">{resolvedDataTableLabels.series}</th>
                <th scope="col">{resolvedDataTableLabels.label}</th>
                <th scope="col">{resolvedDataTableLabels.detail}</th>
                <th scope="col">{resolvedDataTableLabels.value}</th>
              </tr>
            </thead>
            <tbody>
              {validRings.flatMap((ring) => {
                const total = getTotal(ring.segments);

                return ring.segments.map((segment) => (
                  <tr key={`data-${ring.id}-${segment.id}`}>
                    <td>{ring.label ?? ring.id}</td>
                    <th scope="row">{segment.label}</th>
                    <td>{getAccessibleDetail(segment, total, formatValue)}</td>
                    <td>{segment.value}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </figure>
    );
  },
);

RadialBreakdownChart.displayName = 'RadialBreakdownChart';
