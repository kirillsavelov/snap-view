import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'snapView',
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [
    tsconfigPaths(),
    dts({
      rollupTypes: true,
    }),
  ],
});
