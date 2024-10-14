export interface Dimensions {
  width: number;
  height: number;
}

export class HtmlElementDimensions {
  constructor(private htmlElement: HTMLElement) {}

  public getWidth(): number {
    const leftBorder: number = this.getPropertyValue(
      this.htmlElement,
      'border-left-width',
    );
    const rightBorder: number = this.getPropertyValue(
      this.htmlElement,
      'border-right-width',
    );

    return this.htmlElement.clientWidth + leftBorder + rightBorder;
  }

  public getHeight(): number {
    const topBorder: number = this.getPropertyValue(
      this.htmlElement,
      'border-top-width',
    );
    const bottomBorder: number = this.getPropertyValue(
      this.htmlElement,
      'border-bottom-width',
    );

    return this.htmlElement.clientHeight + topBorder + bottomBorder;
  }

  public getDimensions(): Dimensions {
    return {
      width: this.getWidth(),
      height: this.getHeight(),
    };
  }

  private getPropertyValue(htmlElement: HTMLElement, property: string): number {
    const propertyValue: string = window
      .getComputedStyle(htmlElement)
      .getPropertyValue(property);

    return propertyValue
      ? Number.parseFloat(propertyValue.replace('px', ''))
      : 0;
  }
}
