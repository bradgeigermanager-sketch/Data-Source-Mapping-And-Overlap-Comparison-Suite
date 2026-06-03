type FieldSummary = {
  id: string;
  name: string;
  physicalType: string;
};

type FieldComparisonRow = {
  leftField: FieldSummary | null;
  rightField: FieldSummary | null;
  similarityScore?: number;
  typeCompatibility?: string;
  mapping?: FieldMapping | null;
};

interface DatasetComparisonProps {
  leftDataset: Dataset;
  rightDataset: Dataset;
  rows: FieldComparisonRow[];
  onMappingChange: (mapping: FieldMapping) => void;
}

export const DatasetComparisonTable: React.FC<DatasetComparisonProps> = ({
  leftDataset,
  rightDataset,
  rows,
  onMappingChange
}) => {
  return (
    <div className="comparison-table">
      <h3>
        {leftDataset.name} ↔ {rightDataset.name}
      </h3>
      <table>
        <thead>
          <tr>
            <th>{leftDataset.name} field</th>
            <th>Similarity</th>
            <th>Type compatibility</th>
            <th>{rightDataset.name} field</th>
            <th>Mapping status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.leftField?.id ?? "null"}-${row.rightField?.id ?? "null"}`}>
              <td>{row.leftField?.name ?? "—"}</td>
              <td>{row.similarityScore?.toFixed(2) ?? "—"}</td>
              <td>{row.typeCompatibility ?? "—"}</td>
              <td>{row.rightField?.name ?? "—"}</td>
              <td>
                {row.mapping ? (
                  <select
                    value={row.mapping.status}
                    onChange={(e) =>
                      onMappingChange({ ...row.mapping!, status: e.target.value as FieldMapping["status"] })
                    }
                  >
                    <option value="suggested">suggested</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                    <option value="deprecated">deprecated</option>
                  </select>
                ) : (
                  <button
                    onClick={() =>
                      row.leftField &&
                      row.rightField &&
                      onMappingChange({
                        id: crypto.randomUUID(),
                        leftFieldId: row.leftField.id,
                        rightFieldId: row.rightField.id,
                        status: "accepted"
                      })
                    }
                  >
                    Create mapping
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
