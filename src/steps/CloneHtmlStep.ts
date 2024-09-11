import { PipelineStep } from '@/core/PipelineStep';
import { NodeCloner } from '@/core/NodeCloner';
import { NodeClonerFactory } from '@/utils/NodeClonerFactory';

export class CloneHtmlStep implements PipelineStep<HTMLElement, HTMLElement> {
  public async execute(htmlElement: HTMLElement): Promise<HTMLElement> {
    const nodeCloner: NodeCloner = NodeClonerFactory.create(htmlElement);
    const clonedNode: Node = await nodeCloner.clone(htmlElement)

    return clonedNode as HTMLElement;
  }
}
