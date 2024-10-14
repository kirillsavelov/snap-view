export interface ResourceEmbedder {
  embed(htmlElement: HTMLElement): Promise<void>;
}
