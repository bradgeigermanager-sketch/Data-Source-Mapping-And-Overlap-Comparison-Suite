interface EntityField {
  id: string;
  name: string; // logical unified name
}

interface EntityMapping {
  entityField: EntityField;
  mapping: FieldMapping;      // with transformation.expr
  sourceDataset: Dataset;
}

function generateDbtModel(
  modelName: string,
  sourceDataset: Dataset,
  mappings: EntityMapping[],
  ctx: SqlGenContext
): string {
  const selectLines = mappings.map((m) => {
    const sqlExpr = exprToSql(m.mapping.transformation!.expr, ctx);
    return `  ${sqlExpr} AS ${m.entityField.name}`;
  });

  return `
with source as (
  select * from ${sourceDataset.name}
)

select
${selectLines.join(",\n")}
from source
`.trimStart();
}
