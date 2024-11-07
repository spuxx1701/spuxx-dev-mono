import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import swc from 'unplugin-swc';

/// <reference types="vitest" />
export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*'],
      exclude: ['*.{test,spec}.*'],
      tsconfigPath: './tsconfig.json',
      rollupTypes: true,
    }),
    tsconfigPaths(),
    // esbuild doesn't support a couple of features that nestjs requires, so instead
    // we use swc. For example, see: https://github.com/nestjs/nest/issues/9228
    swc.vite({
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
        },
      },
      sourceMaps: true,
    }),
  ],
  test: {
    globals: true,
    reporters: ['default', 'junit'],
    outputFile: `${__dirname}/reports/vitest/junit/junit.xml`,
    include: [`${__dirname}/apps/**/src/**/*.test.ts`],
    exclude: ['**/node_modules/**'],
    watch: false,
    setupFiles: [`${__dirname}/tests/vitest/vitest.setup.ts`],
    coverage: {
      provider: 'v8',
      all: true,
      include: [`${__dirname}/apps/**/src/**/*.ts`],
      exclude: [
        '**/src/main.ts',
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
});
