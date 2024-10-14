import type { NodeCloner } from '@src/core/NodeCloner';
import { DefaultNodeCloner } from '@src/utils/DefaultNodeCloner';
import { HtmlElementCloner } from '@src/utils/HtmlElementCloner';

export class NodeClonerFactory {
  public static create(node: Node): NodeCloner {
    if (node instanceof HTMLElement) {
      return new HtmlElementCloner();
    }

    return new DefaultNodeCloner();
  }
}
