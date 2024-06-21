import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
  coverage: {
    provider: 'c8',
    reporter: ['text', 'html'],
    reportsDirectory: './coverage',
  },
});
