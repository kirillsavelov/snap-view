import type { PipelineStep } from 'src/core/PipelineStep';

export class Pipeline<I, O> {
  private steps: PipelineStep<any, any>[] = [];

  public addStep<T>(step: PipelineStep<I, T>): Pipeline<T, O> {
    this.steps.push(step);

    return this as unknown as Pipeline<T, O>;
  }

  public async execute(input: I): Promise<O> {
    let result: any = input;

    for (const step of this.steps) {
      result = await step.execute(result);
    }

    return result as O;
  }
}
