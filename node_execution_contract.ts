interface NodeExecutor {
  op: string;
  run(inputs: Record<string, any>, config: any): Promise<Record<string, any>>;
}
