import { PipelineStep } from '@/core/PipelineStep';
import { Dimensions } from '@/utils/HtmlElementDimensions';
import { HtmlToSvgConverter } from '@/utils/HtmlToSvgConverter';
import { SvgToImageConverter } from '@/utils/SvgToImageConverter';

export class ConvertHtmlToImageStep
  implements PipelineStep<HTMLElement, HTMLImageElement>
{
  private htmlToSvgConverter: HtmlToSvgConverter;
  private svgToImageConverter: SvgToImageConverter;

  constructor(private readonly dimensions: Dimensions) {
    this.htmlToSvgConverter = new HtmlToSvgConverter(dimensions);
    this.svgToImageConverter = new SvgToImageConverter();
  }

  public async execute(htmlElement: HTMLElement): Promise<HTMLImageElement> {
    return await this.svgToImageConverter.convert(this.htmlToSvgConverter.convert(htmlElement));
  }
}
