import { BaseNodeCloner } from '@src/utils/BaseNodeCloner';
import type { HtmlElementAppearanceCloner } from '@src/utils/HtmlElementAppearanceCloner';
import { HtmlElementStyleCloner } from '@src/utils/HtmlElementStyleCloner';
import { PseudoElementStyleCloner } from '@src/utils/PseudoElementStyleCloner';
import { SymbolElementCloner } from '@src/utils/SymbolElementCloner';

export class HtmlElementCloner extends BaseNodeCloner {
  private htmlElementAppearanceCloners: HtmlElementAppearanceCloner[] = [
    new HtmlElementStyleCloner(),
    new PseudoElementStyleCloner(),
    new SymbolElementCloner(),
  ];

  public async clone(htmlElement: HTMLElement): Promise<HTMLElement> {
    const clonedHtmlElement: HTMLElement = htmlElement.cloneNode(
      false,
    ) as HTMLElement;

    await this.cloneChildNodes(htmlElement, clonedHtmlElement);
    await this.cloneNodeAppearance(htmlElement, clonedHtmlElement);

    return clonedHtmlElement;
  }

  private async cloneNodeAppearance(
    sourceHtmlElement: HTMLElement,
    targetHtmlElement: HTMLElement,
  ): Promise<void> {
    for (const htmlElementAppearanceCloner of this
      .htmlElementAppearanceCloners) {
      await htmlElementAppearanceCloner.clone(
        sourceHtmlElement,
        targetHtmlElement,
      );
    }
  }
}
