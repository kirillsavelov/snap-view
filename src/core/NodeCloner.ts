export interface NodeCloner {
  clone(node: Node): Promise<Node>;
}
