import { page } from '@test/e2e/utils/setup';
import { setupPage } from '@test/e2e/utils/setupPage';
import { snap } from '@test/e2e/utils/snap';
import { describe, expect, it } from 'vitest';

describe('Fonts', () => {
  it('should clone local fonts correctly', async () => {
    await setupPage(page, 'local-fonts.html', 'local-fonts.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone external fonts correctly', async () => {
    await setupPage(page, 'external-fonts.html', 'external-fonts.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });
});
