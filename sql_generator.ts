export interface SqlGenContext {
  fieldNameById: (fieldId: string) => string; // resolves to physical column name
  dialect: "postgres" | "mysql" | "bigquery" | "spark_sql";
}

export function exprToSql(expr: Expr, ctx: SqlGenContext): string {
  switch (expr.kind) {
    case "field_ref":
      return `"${ctx.fieldNameById(expr.fieldId)}"`;
    case "literal":
      if (expr.value === null) return "NULL";
      if (typeof expr.value === "number") return String(expr.value);
      if (typeof expr.value === "boolean") return expr.value ? "TRUE" : "FALSE";
      return `'${String(expr.value).replace(/'/g, "''")}'`;
    case "cast":
      return `CAST(${exprToSql(expr.expr, ctx)} AS ${expr.toType})`;
    case "func":
      return `${expr.name}(${expr.args.map((a) => exprToSql(a, ctx)).join(", ")})`;
    case "binary_op":
      return `(${exprToSql(expr.left, ctx)} ${expr.op} ${exprToSql(expr.right, ctx)})`;
    case "case_when":
      return [
        "CASE",
        ...expr.branches.map(
          (b) => `WHEN ${exprToSql(b.when, ctx)} THEN ${exprToSql(b.then, ctx)}`
        ),
        expr.else ? `ELSE ${exprToSql(expr.else, ctx)}` : "",
        "END"
      ].join(" ");
  }
}
