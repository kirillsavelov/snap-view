import type { NodeCloner } from '@src/core/NodeCloner';
import type { PipelineStep } from '@src/core/PipelineStep';
import { NodeClonerFactory } from '@src/utils/NodeClonerFactory';

export class CloneHtmlStep implements PipelineStep<HTMLElement, HTMLElement> {
  public async execute(htmlElement: HTMLElement): Promise<HTMLElement> {
    const nodeCloner: NodeCloner = NodeClonerFactory.create(htmlElement);
    const clonedNode: Node = await nodeCloner.clone(htmlElement);

    return clonedNode as HTMLElement;
  }
}
