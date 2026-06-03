export type MetricResult = {
  metric: string;
  value: number;
  details?: Record<string, unknown>;
};

export type FieldComparisonResult = {
  leftFieldId: string;
  rightFieldId: string;
  metrics: MetricResult[];
};
