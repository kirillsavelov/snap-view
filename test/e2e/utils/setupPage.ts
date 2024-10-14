import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Page } from 'puppeteer';

export async function setupPage(
  page: Page,
  htmlFile: string,
  cssFile: string,
): Promise<void> {
  const htmlPath: string = resolve(__dirname, `../fixtures/${htmlFile}`);
  const cssPath: string = resolve(__dirname, `../fixtures/${cssFile}`);
  const snapViewPath: string = resolve(
    __dirname,
    '../../../dist/index.iife.js',
  );

  await page.setContent(readFileSync(htmlPath, 'utf-8'), { waitUntil: 'load' });
  await page.addStyleTag({ content: readFileSync(cssPath, 'utf-8') });
  await page.addScriptTag({ path: snapViewPath });
}
