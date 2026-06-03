{
  kind: "binary_op",
  op: "AND",
  left: {
    kind: "semantic_compare",
    mode: "video",
    left: { kind: "volume_ref", volumeId: "A" },
    right: { kind: "volume_ref", volumeId: "B" }
  },
  right: {
    kind: "transcode_compare",
    codec: "h264",
    left: { kind: "volume_ref", volumeId: "A" },
    right: { kind: "volume_ref", volumeId: "B" }
  }
}
