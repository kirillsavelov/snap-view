import { View } from '@/View';
import { Pipeline } from '@/core/Pipeline';
import { ConvertHtmlToImagePipeline } from '@/pipelines/ConvertHtmlToImagePipeline';
import {
  Dimensions,
  HtmlElementDimensions,
} from '@/utils/HtmlElementDimensions';

export class SnapView {
  public async snap(): Promise<View> {
    const htmlElement: HTMLElement = document.getElementById('input')!;
    const imageElement: HTMLImageElement =
      await this.convertHtmlToImage(htmlElement);

    return new View(imageElement);
  }

  private async convertHtmlToImage(
    htmlElement: HTMLElement,
  ): Promise<HTMLImageElement> {
    const dimensions: Dimensions = new HtmlElementDimensions(
      htmlElement,
    ).getDimensions();
    const pipeline: Pipeline<HTMLElement, HTMLImageElement> =
      new ConvertHtmlToImagePipeline(dimensions);

    return await pipeline.execute(htmlElement);
  }
}
