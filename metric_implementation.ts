export interface MetricContext {
  leftField?: Field;
  rightField?: Field;
  leftDataset?: Dataset;
  rightDataset?: Dataset;
  sampleProvider: SampleProvider; // abstraction to fetch samples/stats
  config?: Record<string, unknown>;
}

export interface MetricResult {
  metricId: string;
  outputs: Record<string, unknown>;
}

export interface Metric {
  definition: MetricDefinition;
  run(ctx: MetricContext): Promise<MetricResult>;
}
