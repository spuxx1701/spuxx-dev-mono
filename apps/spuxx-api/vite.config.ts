import baseConfig from '../../vite.config';
import { mergeConfig, defineConfig } from 'vite';

/// <reference types="vitest" />
export default mergeConfig(
  baseConfig,
  defineConfig({
    ssr: {
      target: 'node',
      noExternal: ['dotenv'],
    },
    build: {
      target: 'node',
      outDir: 'dist',
      ssr: true,
      sourcemap: true,
      rollupOptions: {
        treeshake: {
          preset: 'smallest',
        },
        input: {
          main: './src/main.ts',
        },
      },
    },
  }),
);
