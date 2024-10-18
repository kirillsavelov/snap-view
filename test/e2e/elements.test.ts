import { page } from 'test/e2e/utils/setup';
import { setupPage } from 'test/e2e/utils/setupPage';
import { snap } from 'test/e2e/utils/snap';
import { describe, expect, it } from 'vitest';

describe('Elements', () => {
  it('should clone basic elements correctly', async () => {
    await setupPage(page, 'basic-elements.html', 'basic-elements.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone nested elements correctly', async () => {
    await setupPage(page, 'nested-elements.html', 'nested-elements.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone pseudo elements correctly', async () => {
    await setupPage(page, 'pseudo-elements.html', 'pseudo-elements.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });
});
