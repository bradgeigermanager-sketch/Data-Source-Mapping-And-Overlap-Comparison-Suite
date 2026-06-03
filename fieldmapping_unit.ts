export interface FieldMapping {
  id: string;
  leftFieldId: string;
  rightFieldId: string;
  similarityScore?: number;
  status: "suggested" | "accepted" | "rejected" | "deprecated";
  transformation?: {
    kind: "dsl_expr";
    expr: Expr;
    targetType?: string;
  };
  notes?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
