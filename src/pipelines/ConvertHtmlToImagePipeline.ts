import { Pipeline } from 'src/core/Pipeline';
import { CloneHtmlStep } from 'src/steps/CloneHtmlStep';
import { ConvertHtmlToImageStep } from 'src/steps/ConvertHtmlToImageStep';
import { EmbedResourcesStep } from 'src/steps/EmbedResourcesStep';
import type { Dimensions } from 'src/utils/HtmlElementDimensions';
import type { ViewBoxDimensions } from 'src/utils/ViewBoxDimensions';

export class ConvertHtmlToImagePipeline extends Pipeline<
  HTMLElement,
  HTMLImageElement
> {
  constructor(viewBoxDimensions: ViewBoxDimensions, dimensions: Dimensions) {
    super();

    this.addStep(new CloneHtmlStep())
      .addStep(new EmbedResourcesStep())
      .addStep(new ConvertHtmlToImageStep(viewBoxDimensions, dimensions));
  }
}
