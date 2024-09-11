import { Converter } from '@/core/Converter';
import { Dimensions } from '@/utils/HtmlElementDimensions';

export class HtmlToSvgConverter implements Converter<HTMLElement, SVGElement> {
	private static readonly NAMESPACE = 'http://www.w3.org/2000/svg';

	constructor(private readonly dimensions: Dimensions) {}

	public convert(htmlElement: HTMLElement): SVGElement {
		const foreignObject: Element = document.createElementNS(
			HtmlToSvgConverter.NAMESPACE,
			'foreignObject',
		);
		const svgElement: Element = document.createElementNS(
			HtmlToSvgConverter.NAMESPACE,
			'svg',
		);

		foreignObject.setAttribute('width', '100%');
		foreignObject.setAttribute('height', '100%');
		foreignObject.setAttribute('x', '0');
		foreignObject.setAttribute('y', '0');
		foreignObject.setAttribute('externalResourcesRequired', 'true');

		svgElement.setAttribute('width', `${this.dimensions.width}`);
		svgElement.setAttribute('height', `${this.dimensions.height}`);
		svgElement.setAttribute(
			'viewBox',
			`0 0 ${this.dimensions.width} ${this.dimensions.height}`,
		);

		foreignObject.appendChild(htmlElement);
		svgElement.appendChild(foreignObject);

		return svgElement as SVGElement;
	}
}