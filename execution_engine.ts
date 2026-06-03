export class MetricEngine {
  constructor(
    private registry: Map<string, Metric>, // metricId -> Metric
  ) {}

  async runGraph(
    graph: MetricGraph,
    ctx: MetricContext
  ): Promise<Record<string, MetricResult>> {
    const results: Record<string, MetricResult> = {};
    const inDegree: Record<string, number> = {};

    graph.nodes.forEach((n) => (inDegree[n.id] = 0));
    graph.edges.forEach((e) => inDegree[e.toNodeId]++);

    const queue: string[] = graph.nodes
      .filter((n) => inDegree[n.id] === 0)
      .map((n) => n.id);

    const nodeById = new Map(graph.nodes.map((n) => [n.id, n]));

    while (queue.length) {
      const nodeId = queue.shift()!;
      const node = nodeById.get(nodeId)!;
      const metric = this.registry.get(node.metricId)!;

      const nodeCtx: MetricContext = {
        ...ctx,
        config: node.config,
        // you can also inject prior results if needed
      };

      const result = await metric.run(nodeCtx);
      results[nodeId] = result;

      for (const edge of graph.edges.filter((e) => e.fromNodeId === nodeId)) {
        inDegree[edge.toNodeId]--;
        if (inDegree[edge.toNodeId] === 0) {
          queue.push(edge.toNodeId);
        }
      }
    }

    return results;
  }
}
