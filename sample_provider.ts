export interface SampleProvider {
  getFieldSample(
    fieldId: string,
    opts?: { limit?: number }
  ): Promise<unknown[]>;

  getFieldStats(fieldId: string): Promise<Record<string, unknown>>;
}
