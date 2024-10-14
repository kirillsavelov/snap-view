import type { NodeCloner } from '@src/core/NodeCloner';
import type { HtmlElementAppearanceCloner } from '@src/utils/HtmlElementAppearanceCloner';
import { NodeClonerFactory } from '@src/utils/NodeClonerFactory';

export class SymbolElementCloner implements HtmlElementAppearanceCloner {
  private static readonly NAMESPACE = 'http://www.w3.org/2000/svg';

  public async clone(
    sourceHtmlElement: HTMLElement,
    targetHtmlElement: HTMLElement,
  ): Promise<void> {
    const useElements: SVGUseElement[] = this.getUseElements(targetHtmlElement);

    if (useElements.length === 0) {
      return;
    }

    const symbolElementsById: Map<string, SVGSymbolElement> =
      await this.processUseElements(useElements, targetHtmlElement);

    this.appendSymbolElements(targetHtmlElement, symbolElementsById);
  }

  private getUseElements(htmlElement: HTMLElement): SVGUseElement[] {
    return Array.from(htmlElement.querySelectorAll('use'));
  }

  private async processUseElements(
    useElements: SVGUseElement[],
    htmlElement: HTMLElement,
  ): Promise<Map<string, SVGSymbolElement>> {
    const symbolElementsById: Map<string, SVGSymbolElement> = new Map();

    for (const useElement of useElements) {
      const id: string | null = useElement.getAttribute('href');

      if (id) {
        await this.handleSymbolElement(htmlElement, id, symbolElementsById);
      }
    }

    return symbolElementsById;
  }

  private async handleSymbolElement(
    htmlElement: HTMLElement,
    id: string,
    symbolElementsById: Map<string, SVGSymbolElement>,
  ): Promise<void> {
    const isSymbolElementInHtmlElement: boolean =
      !!htmlElement.querySelector(id);
    const symbolElementInDocument: SVGSymbolElement | null =
      document.querySelector(id);

    if (
      !isSymbolElementInHtmlElement &&
      symbolElementInDocument &&
      !symbolElementsById.has(id)
    ) {
      const clonedSymbolElement: SVGSymbolElement =
        await this.cloneSymbolElement(symbolElementInDocument);

      symbolElementsById.set(id, clonedSymbolElement);
    }
  }

  private async cloneSymbolElement(
    symbolElement: SVGSymbolElement,
  ): Promise<SVGSymbolElement> {
    const nodeCloner: NodeCloner = NodeClonerFactory.create(symbolElement);

    return (await nodeCloner.clone(symbolElement)) as SVGSymbolElement;
  }

  private appendSymbolElements(
    htmlElement: HTMLElement,
    symbolElementsById: Map<string, SVGSymbolElement>,
  ): void {
    if (symbolElementsById.size) {
      const defsElement: SVGDefsElement =
        this.createDefsElement(symbolElementsById);
      const svgElement: SVGSVGElement = this.createHiddenSvgElement();

      svgElement.appendChild(defsElement);
      htmlElement.appendChild(svgElement);
    }
  }

  private createDefsElement(
    symbolElementsById: Map<string, SVGSymbolElement>,
  ): SVGDefsElement {
    const defsElement: SVGDefsElement = document.createElementNS(
      SymbolElementCloner.NAMESPACE,
      'defs',
    );

    for (const symbolElement of symbolElementsById.values()) {
      defsElement.appendChild(symbolElement);
    }

    return defsElement;
  }

  private createHiddenSvgElement(): SVGSVGElement {
    const svgElement: SVGSVGElement = document.createElementNS(
      SymbolElementCloner.NAMESPACE,
      'svg',
    ) as SVGSVGElement;

    Object.assign(svgElement.style, {
      position: 'absolute',
      width: '0',
      height: '0',
      overflow: 'hidden',
      display: 'none',
    });

    return svgElement;
  }
}
