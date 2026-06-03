export interface MetricNode {
  id: string;                 // unique in graph
  metricId: string;           // reference to MetricDefinition.id
  config?: Record<string, unknown>;
}

export interface MetricEdge {
  fromNodeId: string;
  toNodeId: string;
  // optional: which outputs feed which inputs (if you want explicit wiring)
  mapping?: Record<string, string>;
}

export interface MetricGraph {
  id: string;
  scope: MetricScope;
  nodes: MetricNode[];
  edges: MetricEdge[];
}
