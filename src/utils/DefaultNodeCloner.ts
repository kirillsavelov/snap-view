import { BaseNodeCloner } from '@src/utils/BaseNodeCloner';

export class DefaultNodeCloner extends BaseNodeCloner {
  public async clone(node: Node): Promise<Node> {
    const clonedNode: Node = node.cloneNode(false);

    await this.cloneChildNodes(node, clonedNode);

    return clonedNode;
  }
}
