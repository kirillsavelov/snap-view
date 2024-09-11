export interface HtmlElementAppearanceCloner {
  clone(
    sourceHtmlElement: HTMLElement,
    targetHtmlElement: HTMLElement,
  ): Promise<void>;
}
