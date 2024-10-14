import { page } from '@test/e2e/utils/setup';
import { setupPage } from '@test/e2e/utils/setupPage';
import { snap } from '@test/e2e/utils/snap';
import { describe, expect, it } from 'vitest';

describe('Styles', () => {
  it('should clone basic styles correctly', async () => {
    await setupPage(page, 'basic-styles.html', 'basic-styles.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone colors correctly', async () => {
    await setupPage(page, 'colors.html', 'colors.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone backgrounds correctly', async () => {
    await setupPage(page, 'backgrounds.html', 'backgrounds.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone borders correctly', async () => {
    await setupPage(page, 'borders.html', 'borders.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone outline correctly', async () => {
    await setupPage(page, 'outline.html', 'outline.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone gradients correctly', async () => {
    await setupPage(page, 'gradients.html', 'gradients.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone shadows correctly', async () => {
    await setupPage(page, 'shadows.html', 'shadows.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone transforms correctly', async () => {
    await setupPage(page, 'transforms.html', 'transforms.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone flexbox correctly', async () => {
    await setupPage(page, 'flexbox.html', 'flexbox.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });

  it('should clone grid correctly', async () => {
    await setupPage(page, 'grid.html', 'grid.css');

    const snapshot: Buffer = await snap(page);

    expect(snapshot).toMatchImageSnapshot();
  });
});
