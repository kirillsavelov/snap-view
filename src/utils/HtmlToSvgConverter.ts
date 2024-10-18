import type { Converter } from 'src/core/Converter';
import type { Dimensions } from 'src/utils/HtmlElementDimensions';
import type { ViewBoxDimensions } from 'src/utils/ViewBoxDimensions';

export class HtmlToSvgConverter implements Converter<HTMLElement, SVGElement> {
  private static readonly NAMESPACE = 'http://www.w3.org/2000/svg';

  constructor(
    private readonly viewBoxDimensions: ViewBoxDimensions,
    private readonly dimensions: Dimensions,
  ) {}

  public convert(htmlElement: HTMLElement): SVGElement {
    const foreignObject: SVGForeignObjectElement = document.createElementNS(
      HtmlToSvgConverter.NAMESPACE,
      'foreignObject',
    );
    const svgElement: SVGElement = document.createElementNS(
      HtmlToSvgConverter.NAMESPACE,
      'svg',
    );

    foreignObject.setAttribute('width', `${this.dimensions.width}`);
    foreignObject.setAttribute('height', `${this.dimensions.height}`);
    foreignObject.setAttribute('x', '0');
    foreignObject.setAttribute('y', '0');
    foreignObject.setAttribute('externalResourcesRequired', 'true');

    svgElement.setAttribute('width', `${this.viewBoxDimensions.width}`);
    svgElement.setAttribute('height', `${this.viewBoxDimensions.height}`);
    svgElement.setAttribute(
      'viewBox',
      `${this.viewBoxDimensions.x} ${this.viewBoxDimensions.y} ${this.viewBoxDimensions.width} ${this.viewBoxDimensions.height}`,
    );

    foreignObject.appendChild(htmlElement);
    svgElement.appendChild(foreignObject);

    return svgElement as SVGElement;
  }
}
