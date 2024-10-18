import { BaseResourceEmbedder } from 'src/utils/BaseResourceEmbedder';

export class ImageEmbedder extends BaseResourceEmbedder {
  public async embed(htmlElement: HTMLElement): Promise<void> {
    await this.processHtmlElement(htmlElement);
  }

  private async processHtmlElement(htmlElement: HTMLElement): Promise<void> {
    if (htmlElement.tagName === 'IMG' && htmlElement.getAttribute('src')) {
      await this.processImage(htmlElement);
    }

    if (htmlElement.style) {
      await this.processStyle(htmlElement);
    }

    if (htmlElement.hasAttribute('style')) {
      await this.processInlineStyle(htmlElement);
    }

    await this.processComputedStyle(htmlElement);

    for (const childNode of Array.from(htmlElement.childNodes)) {
      if (childNode.nodeType === Node.ELEMENT_NODE) {
        await this.processHtmlElement(childNode as HTMLElement);
      }
    }
  }

  private async processImage(htmlElement: HTMLElement): Promise<void> {
    const src: string | null = htmlElement.getAttribute('src');

    if (src && !src.startsWith('data:')) {
      const dataUrl: string = await this.getDataUrl(src);

      htmlElement.setAttribute('src', dataUrl);
    }
  }

  private async processInlineStyle(htmlElement: HTMLElement): Promise<void> {
    await this.processStyle(htmlElement);
    htmlElement.setAttribute('style', htmlElement.style.cssText);
  }

  private async processStyle(htmlElement: HTMLElement): Promise<void> {
    const style: CSSStyleDeclaration = htmlElement.style;

    await this.processStyleProperties(
      style,
      (property: string, dataUrl: string): void => {
        if (property in style) {
          style.setProperty(property, dataUrl);
        }
      },
    );
  }

  private async processComputedStyle(htmlElement: HTMLElement): Promise<void> {
    const computedStyle: CSSStyleDeclaration =
      window.getComputedStyle(htmlElement);

    await this.processStyleProperties(
      computedStyle,
      (property: string, dataUrl: string): void => {
        if (property in computedStyle) {
          const propertyValue = computedStyle.getPropertyValue(property);

          if (propertyValue) {
            htmlElement.style.setProperty(
              property,
              propertyValue.replace(dataUrl, ''),
            );
          }
        }
      },
    );
  }

  private async processStyleProperties(
    style: CSSStyleDeclaration,
    applyUrl: (property: string, dataUrl: string) => void,
  ): Promise<void> {
    const imageProperties: string[] = [
      'backgroundImage',
      'borderImageSource',
      'listStyleImage',
    ];

    for (const imageProperty of imageProperties) {
      const imagePropertyValue: string = style.getPropertyValue(imageProperty);

      if (imagePropertyValue && imagePropertyValue !== 'none') {
        const urls: string[] = this.extractUrls(imagePropertyValue);

        for (const url of urls) {
          if (!url.startsWith('data:')) {
            const dataUrl: string = await this.getDataUrl(url);

            applyUrl(imageProperty, dataUrl);
          }
        }
      }
    }
  }
}
