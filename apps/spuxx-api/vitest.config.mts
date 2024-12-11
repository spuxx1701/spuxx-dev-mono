import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(
  viteConfig,
  defineConfig({
    build: {
      sourcemap: true,
    },
    test: {
      globals: true,
      reporters: ['default', 'junit'],
      outputFile: `./reports/vitest/junit/junit.xml`,
      include: [`./src/**/*.test.ts`],
      watch: false,
      setupFiles: [`./tests/vitest/vitest.setup.ts`],
      coverage: {
        provider: 'v8',
        all: true,
        include: [`./src/**/*.ts`],
        exclude: [
          '**/src/main.ts',
          '**/*.toledo.module.ts',
          '**/*.bootstrap.ts',
          '**/src/orm/**',
          '**/*types.ts',
          '**/*.d.ts',
          '**/*test.ts',
          '**/index.ts',
          '**/private/**',
        ],
        reportsDirectory: 'reports/vitest/coverage',
        reporter: ['text', 'cobertura'],
      },
    },
  }),
);
