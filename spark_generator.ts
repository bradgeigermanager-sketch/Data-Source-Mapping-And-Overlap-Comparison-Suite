export function exprToPySpark(expr: Expr, fieldNameById: (id: string) => string): string {
  switch (expr.kind) {
    case "field_ref":
      return `F.col("${fieldNameById(expr.fieldId)}")`;
    case "literal":
      if (expr.value === null) return "F.lit(None)";
      if (typeof expr.value === "string") return `F.lit("${expr.value}")`;
      return `F.lit(${String(expr.value)})`;
    case "cast":
      return `${exprToPySpark(expr.expr, fieldNameById)}.cast("${expr.toType}")`;
    case "func":
      return `F.${expr.name}(${expr.args
        .map((a) => exprToPySpark(a, fieldNameById))
        .join(", ")})`;
    case "binary_op":
      // naive: rely on Python operators
      return `(${exprToPySpark(expr.left, fieldNameById)} ${expr.op} ${exprToPySpark(
        expr.right,
        fieldNameById
      )})`;
    case "case_when":
      // could map to chained when/otherwise
      const [first, ...rest] = expr.branches;
      let base = `F.when(${exprToPySpark(first.when, fieldNameById)}, ${exprToPySpark(
        first.then,
        fieldNameById
      )})`;
      for (const b of rest) {
        base += `.when(${exprToPySpark(b.when, fieldNameById)}, ${exprToPySpark(
          b.then,
          fieldNameById
        )})`;
      }
      if (expr.else) {
        base += `.otherwise(${exprToPySpark(expr.else, fieldNameById)})`;
      }
      return base;
  }
}
