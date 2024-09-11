import { HtmlElementAppearanceCloner } from '@/utils/HtmlElementAppearanceCloner';

export class HtmlElementStyleCloner implements HtmlElementAppearanceCloner {
  public async clone(
    sourceHtmlElement: HTMLElement,
    targetHtmlElement: HTMLElement,
  ): Promise<void> {
    const sourceHtmlElementStyle: CSSStyleDeclaration =
      window.getComputedStyle(sourceHtmlElement);
    const targetHtmlElementStyle: CSSStyleDeclaration = targetHtmlElement.style;

    Array.from(sourceHtmlElementStyle).forEach((property: string): void => {
      targetHtmlElementStyle.setProperty(property, sourceHtmlElementStyle.getPropertyValue(property));
    });
  }
}
