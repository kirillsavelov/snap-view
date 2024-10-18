import type { Converter } from 'src/core/Converter';
import { ImageLoader } from 'src/utils/ImageLoader';

export class SvgToImageConverter
  implements Converter<SVGElement, HTMLImageElement>
{
  public async convert(svgElement: SVGElement): Promise<HTMLImageElement> {
    const xmlSerializer: XMLSerializer = new XMLSerializer();
    const serializedSvgElement: string =
      xmlSerializer.serializeToString(svgElement);
    const data: string = encodeURIComponent(serializedSvgElement);
    const dataURL: string = `data:image/svg+xml;charset=utf-8,${data}`;

    return ImageLoader.load(dataURL);
  }
}
