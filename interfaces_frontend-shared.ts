export interface DataSource {
  id: string;
  name: string;
  kind: string;
  tags?: string[];
  connection: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface Dataset {
  id: string;
  sourceId: string;
  name: string;
  path?: string;
  logicalType: string;
  rowCountEstimate?: number;
  sampleProfileId?: string;
  metadata?: Record<string, unknown>;
}

export interface Field {
  id: string;
  datasetId: string;
  name: string;
  physicalType: string;
  logicalType?: string;
  nullable?: boolean;
  cardinalityEstimate?: number;
  sampleStatsId?: string;
  metadata?: Record<string, unknown>;
}

export interface FieldMapping {
  id: string;
  leftFieldId: string;
  rightFieldId: string;
  similarityScore?: number;
  status: "suggested" | "accepted" | "rejected" | "deprecated";
  transformation?: {
    kind: "identity" | "cast" | "normalize" | "lookup" | "custom_expression";
    expression?: string;
  };
  notes?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
