export enum MimeType {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  WEBP = 'image/webp',
}

export interface BlobOptions {
  type?: MimeType;
  quality?: number;
}

export interface DataUrlOptions {
  type?: MimeType;
  quality?: number;
}

export class View {
  constructor(private readonly imageElement: HTMLImageElement) {}

  public async getCanvas(): Promise<HTMLCanvasElement> {
    const canvasElement: HTMLCanvasElement = document.createElement('canvas');
    const canvasContext: CanvasRenderingContext2D | null =
      canvasElement.getContext('2d');

    canvasElement.width = this.imageElement.width * window.devicePixelRatio;
    canvasElement.height = this.imageElement.height * window.devicePixelRatio;
    canvasElement.style.width = `${this.imageElement.width}`;
    canvasElement.style.height = `${this.imageElement.height}`;

    canvasContext?.drawImage(
      this.imageElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height,
    );

    return canvasElement;
  }

  public async getBlob(options: BlobOptions = {}): Promise<Blob> {
    const canvasElement: HTMLCanvasElement = await this.getCanvas();

    return new Promise(
      (
        resolve: (value: Blob) => void,
        reject: (reason?: unknown) => void,
      ): void => {
        canvasElement.toBlob(
          (blob: Blob | null) => {
            if (blob === null) {
              reject(new Error());
            } else {
              resolve(blob);
            }
          },
          options.type,
          options.quality,
        );
      },
    );
  }

  public async getDataURL(options: DataUrlOptions = {}): Promise<string> {
    const canvasElement: HTMLCanvasElement = await this.getCanvas();

    return canvasElement.toDataURL(options.type, options.quality);
  }
}
