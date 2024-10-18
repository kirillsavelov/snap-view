import { View } from 'src/View';
import type { Pipeline } from 'src/core/Pipeline';
import { ConvertHtmlToImagePipeline } from 'src/pipelines/ConvertHtmlToImagePipeline';
import {
  type Dimensions,
  HtmlElementDimensions,
} from 'src/utils/HtmlElementDimensions';
import type { ViewBoxDimensions } from 'src/utils/ViewBoxDimensions';

export class SnapView {
  public async snap(): Promise<View> {
    const htmlElement: HTMLElement = document.body;
    const imageElement: HTMLImageElement =
      await this.convertHtmlToImage(htmlElement);

    return new View(imageElement);
  }

  private async convertHtmlToImage(
    htmlElement: HTMLElement,
  ): Promise<HTMLImageElement> {
    const viewBoxDimensions: ViewBoxDimensions = {
      x: window.scrollX,
      y: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const dimensions: Dimensions = new HtmlElementDimensions(
      htmlElement,
    ).getDimensions();
    const pipeline: Pipeline<HTMLElement, HTMLImageElement> =
      new ConvertHtmlToImagePipeline(viewBoxDimensions, dimensions);

    return await pipeline.execute(htmlElement);
  }
}
