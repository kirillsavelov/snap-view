import type { HtmlElementAppearanceCloner } from 'src/utils/HtmlElementAppearanceCloner';

enum PseudoElement {
  Before = ':before',
  After = ':after',
}

export class PseudoElementStyleCloner implements HtmlElementAppearanceCloner {
  public async clone(
    sourceHtmlElement: HTMLElement,
    targetHtmlElement: HTMLElement,
  ): Promise<void> {
    const pseudoElements: PseudoElement[] = [
      PseudoElement.Before,
      PseudoElement.After,
    ];

    for (const pseudoElement of pseudoElements) {
      const pseudoElementStyle: CSSStyleDeclaration = window.getComputedStyle(
        sourceHtmlElement,
        pseudoElement,
      );

      if (!this.hasContent(pseudoElementStyle)) {
        return;
      }

      const сlassName: string = this.generateClassName();
      const cssText: string = this.getCssText(pseudoElementStyle);
      const styleElement: HTMLStyleElement = document.createElement('style');
      styleElement.textContent = `.${сlassName}${pseudoElement} { ${cssText} }`;

      targetHtmlElement.classList.add(сlassName);
      targetHtmlElement.appendChild(styleElement);
    }
  }

  private hasContent(pseudoElementStyle: CSSStyleDeclaration): boolean {
    const content: string = pseudoElementStyle.getPropertyValue('content');

    return content !== '' && content !== 'none';
  }

  private generateClassName(): string {
    const id: string = Math.random().toString(36).substring(2, 11);

    return `pseudo-element-clone-${id}`;
  }

  private getCssText(style: CSSStyleDeclaration): string {
    return Array.from(style).reduce(
      (cssText: string, property: string): string => {
        const propertyValue: string = style.getPropertyValue(property);
        const propertyPriority: string = style.getPropertyPriority(property);

        return `${cssText}${property}: ${propertyValue}${propertyPriority ? ' !important' : ''};`;
      },
    );
  }
}
