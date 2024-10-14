import type { PipelineStep } from '@src/core/PipelineStep';
import type { ResourceEmbedder } from '@src/core/ResourceEmbedder';
import { FontEmbedder } from '@src/utils/FontEmbedder';
import { ImageEmbedder } from '@src/utils/ImageEmbedder';

export class EmbedResourcesStep
  implements PipelineStep<HTMLElement, HTMLElement>
{
  private resourceEmbedders: ResourceEmbedder[] = [
    new FontEmbedder(),
    new ImageEmbedder(),
  ];

  public async execute(htmlElement: HTMLElement): Promise<HTMLElement> {
    await this.embedResources(htmlElement);

    return htmlElement;
  }

  private async embedResources(htmlElement: HTMLElement): Promise<void> {
    for (const resourceEmbedder of this.resourceEmbedders) {
      await resourceEmbedder.embed(htmlElement);
    }
  }
}
