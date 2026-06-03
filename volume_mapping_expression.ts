export type VolumeExpr =
  | { kind: "volume_ref"; volumeId: string }
  | { kind: "hash_compare"; left: VolumeExpr; right: VolumeExpr; algo: string }
  | { kind: "block_compare"; left: VolumeExpr; right: VolumeExpr; blockSize: number }
  | { kind: "transcode_compare"; left: VolumeExpr; right: VolumeExpr; codec: string }
  | { kind: "semantic_compare"; left: VolumeExpr; right: VolumeExpr; mode: "video"|"table"|"binary" }
  | { kind: "binary_op"; op: "AND"|"OR"; left: VolumeExpr; right: VolumeExpr }
  | { kind: "literal"; value: boolean };
