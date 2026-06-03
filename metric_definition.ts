export type MetricScope = "field_pair" | "dataset_pair";

export interface MetricDefinition {
  id: string;                 // e.g. "name_similarity"
  scope: MetricScope;
  inputs: string[];           // logical inputs, e.g. ["field_name_tokens"]
  outputs: string[];          // e.g. ["nameSimilarity"]
  configSchema?: object;      // JSON Schema for metric-specific config
}
