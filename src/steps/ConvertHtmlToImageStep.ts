import type { PipelineStep } from 'src/core/PipelineStep';
import type { Dimensions } from 'src/utils/HtmlElementDimensions';
import { HtmlToSvgConverter } from 'src/utils/HtmlToSvgConverter';
import { SvgToImageConverter } from 'src/utils/SvgToImageConverter';
import type { ViewBoxDimensions } from 'src/utils/ViewBoxDimensions';

export class ConvertHtmlToImageStep
  implements PipelineStep<HTMLElement, HTMLImageElement>
{
  private htmlToSvgConverter: HtmlToSvgConverter;
  private svgToImageConverter: SvgToImageConverter;

  constructor(
    private readonly viewBoxDimensions: ViewBoxDimensions,
    private readonly dimensions: Dimensions,
  ) {
    this.htmlToSvgConverter = new HtmlToSvgConverter(
      viewBoxDimensions,
      dimensions,
    );
    this.svgToImageConverter = new SvgToImageConverter();
  }

  public async execute(htmlElement: HTMLElement): Promise<HTMLImageElement> {
    return await this.svgToImageConverter.convert(
      this.htmlToSvgConverter.convert(htmlElement),
    );
  }
}
