export class ImageLoader {
  public static load(src: string): Promise<HTMLImageElement> {
    return new Promise(
      (
        resolve: (value: HTMLImageElement) => void,
        reject: (reason?: unknown) => void,
      ): void => {
        const imageElement: HTMLImageElement = new Image();

        imageElement.crossOrigin = 'anonymous';
        imageElement.decoding = 'async';
        imageElement.onload = () => resolve(imageElement);
        imageElement.onerror = reject;
        imageElement.src = src;
      },
    );
  }
}
