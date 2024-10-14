import type { View } from '@src/View';
import type { Page } from 'puppeteer';

export async function snap(page: Page): Promise<Buffer> {
  const dataUrl: string = await page.evaluate(async () => {
    const view: View = await window.snapView.snap();

    return await view.getDataURL();
  });

  return Buffer.from(dataUrl.split(',')[1], 'base64');
}
