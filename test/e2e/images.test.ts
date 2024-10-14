import { page } from '@test/e2e/utils/setup';
import { setupPage } from '@test/e2e/utils/setupPage';
import { snap } from '@test/e2e/utils/snap';
import { describe, expect, it } from 'vitest';

describe('Images', () => {
  it('should clone images correctly', async () => {
    await setupPage(page, 'images.html', 'images.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone background images correctly', async () => {
    await setupPage(page, 'background-images.html', 'background-images.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });
});
