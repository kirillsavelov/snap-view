import type { View } from 'src/View';

declare global {
  interface Window {
    snapView: {
      snap: () => Promise<View>;
    };
  }
}
