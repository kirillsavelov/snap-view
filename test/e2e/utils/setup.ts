import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { type Browser, type Page, launch } from 'puppeteer';
import { afterEach, beforeEach, expect } from 'vitest';

export let browser: Browser;
export let page: Page;

beforeEach(async () => {
  const width: number = 1920;
  const height: number = 1080;

  browser = await launch({ args: [`--window-size=${width},${height}`] });
  page = await browser.newPage();

  await page.setViewport({ width, height });
});

afterEach(async () => {
  await browser.close();
});

expect.extend({
  toMatchImageSnapshot: configureToMatchImageSnapshot({
    failureThresholdType: 'pixel',
    failureThreshold: 10,
  }),
});
