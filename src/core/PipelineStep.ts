export interface PipelineStep<I, O> {
  execute(input: I): Promise<O>;
}
