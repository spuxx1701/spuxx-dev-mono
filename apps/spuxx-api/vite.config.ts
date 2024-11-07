/// <reference types="vitest" />
import baseConfig from '../../vite.config.nest';
import { mergeConfig, defineConfig } from 'vite';
import { builtinModules } from 'module';

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      target: 'node',
      outDir: 'dist',
      ssr: true,
      sourcemap: true,
      rollupOptions: {
        input: {
          main: './src/main.ts',
        },
        external: [...builtinModules],
      },
    },
  }),
);
