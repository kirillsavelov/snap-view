import type { NodeCloner } from 'src/core/NodeCloner';
import { NodeClonerFactory } from 'src/utils/NodeClonerFactory';

export abstract class BaseNodeCloner implements NodeCloner {
  public abstract clone(node: Node): Promise<Node>;

  protected async cloneChildNodes(node: Node, clonedNode: Node): Promise<void> {
    const childNodes: Node[] = Array.from(node.childNodes);

    for (const childNode of childNodes) {
      const nodeCloner: NodeCloner | null = NodeClonerFactory.create(childNode);

      if (nodeCloner) {
        const clonedChildNode: Node | null = await nodeCloner.clone(childNode);

        if (clonedChildNode) {
          clonedNode.appendChild(clonedChildNode);
        }
      }
    }
  }
}
