import { mergeConfig } from 'vitest/config';
import config from './vitest.config';

export default mergeConfig(config, {
  test: {
    setupFiles: ['test/e2e/utils/setup.ts'],
    include: ['test/e2e/**/*.test.ts'],
  },
});
