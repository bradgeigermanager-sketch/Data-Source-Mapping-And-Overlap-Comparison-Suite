export type Expr =
  | { kind: "field_ref"; fieldId: string }                 // source field
  | { kind: "literal"; value: string | number | boolean | null }
  | { kind: "cast"; expr: Expr; toType: string }
  | { kind: "func"; name: string; args: Expr[] }           // generic function
  | { kind: "binary_op"; op: string; left: Expr; right: Expr }
  | { kind: "case_when"; branches: { when: Expr; then: Expr }[]; else?: Expr };
