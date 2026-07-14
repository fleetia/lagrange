export type RadialBreakdownSegment = {
  color: string;
  detail?: string;
  id: string;
  label: string;
  labelAngle?: number;
  value: number;
};

export type RadialBreakdownRing = {
  id: string;
  label?: string;
  segments: readonly RadialBreakdownSegment[];
};

export type RadialBreakdownChartDataTableLabels = {
  caption: string;
  detail: string;
  label: string;
  series: string;
  value: string;
};
