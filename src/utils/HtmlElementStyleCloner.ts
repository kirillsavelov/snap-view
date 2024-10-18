import type { HtmlElementAppearanceCloner } from 'src/utils/HtmlElementAppearanceCloner';

export class HtmlElementStyleCloner implements HtmlElementAppearanceCloner {
  public async clone(
    sourceHtmlElement: HTMLElement,
    targetHtmlElement: HTMLElement,
  ): Promise<void> {
    const sourceHtmlElementStyle: CSSStyleDeclaration =
      window.getComputedStyle(sourceHtmlElement);
    const targetHtmlElementStyle: CSSStyleDeclaration = targetHtmlElement.style;

    for (const property of Array.from(sourceHtmlElementStyle)) {
      targetHtmlElementStyle.setProperty(
        property,
        sourceHtmlElementStyle.getPropertyValue(property),
      );
    }
  }
}
