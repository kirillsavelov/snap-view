import type { ResourceEmbedder } from '@src/core/ResourceEmbedder';

export abstract class BaseResourceEmbedder implements ResourceEmbedder {
  public abstract embed(htmlElement: HTMLElement): Promise<void>;

  protected async getDataUrl(url: string, baseUrl?: string): Promise<string> {
    try {
      const absoluteUrl: string = this.resolveUrl(url, baseUrl);
      const response: Response = await fetch(absoluteUrl);
      const blob: Blob = await response.blob();

      return await this.convertBlobToDataUrl(blob);
    } catch (error) {
      console.error('Failed to get data URL for resource:', url, error);

      return url;
    }
  }

  protected extractUrls(cssText: string): string[] {
    const urlRegex: RegExp = /url\(["']?(.*?)["']?\)/g;
    const matches: string[] = [];
    let match: RegExpExecArray | null = urlRegex.exec(cssText);

    while (match) {
      matches.push(match[1]);
      match = urlRegex.exec(cssText);
    }

    return matches;
  }

  private resolveUrl(url: string, baseUrl?: string): string {
    return new URL(url, baseUrl || document.baseURI).href;
  }

  private async convertBlobToDataUrl(blob: Blob): Promise<string> {
    return new Promise(
      (
        resolve: (value: string) => void,
        reject: (reason?: unknown) => void,
      ): void => {
        const reader: FileReader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;

        reader.readAsDataURL(blob);
      },
    );
  }
}
