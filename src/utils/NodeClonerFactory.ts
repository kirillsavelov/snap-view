import { NodeCloner } from '@/core/NodeCloner';
import { HtmlElementCloner } from '@/utils/HtmlElementCloner';
import { DefaultNodeCloner } from '@/utils/DefaultNodeCloner';

export class NodeClonerFactory {
  public static create(node: Node): NodeCloner {
    if (node instanceof HTMLElement) {
      return new HtmlElementCloner();
    }

    return new DefaultNodeCloner();
  }
}
