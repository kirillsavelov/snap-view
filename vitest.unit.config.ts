import { mergeConfig } from 'vitest/config';
import config from './vitest.config';

export default mergeConfig(config, {
  test: {
    environment: 'jsdom',
    include: ['test/unit/**/*.test.ts'],
  },
});
