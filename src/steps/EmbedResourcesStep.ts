import { PipelineStep } from '@/core/PipelineStep';
import { ResourceEmbedder } from '@/core/ResourceEmbedder';
import { FontEmbedder } from '@/utils/FontEmbedder';
import { ImageEmbedder } from '@/utils/ImageEmbedder';

export class EmbedResourcesStep implements PipelineStep<HTMLElement, HTMLElement> {
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
