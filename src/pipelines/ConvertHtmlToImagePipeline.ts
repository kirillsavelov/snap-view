import { Pipeline } from '@/core/Pipeline';
import { CloneHtmlStep } from '@/steps/CloneHtmlStep';
import { EmbedResourcesStep } from '@/steps/EmbedResourcesStep';
import { ConvertHtmlToImageStep } from '@/steps/ConvertHtmlToImageStep';
import { Dimensions } from '@/utils/HtmlElementDimensions';

export class ConvertHtmlToImagePipeline extends Pipeline<
  HTMLElement,
  HTMLImageElement
> {
  constructor(dimensions: Dimensions) {
    super();

    this.addStep(new CloneHtmlStep())
      .addStep(new EmbedResourcesStep())
      .addStep(new ConvertHtmlToImageStep(dimensions));
  }
}
