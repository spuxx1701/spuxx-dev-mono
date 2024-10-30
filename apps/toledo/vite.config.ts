import { fileURLToPath, URL } from 'node:url';
import { mergeConfig, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import baseConfig from '../../vite.config';
import tsconfigPaths from 'vite-tsconfig-paths';

/// <reference types="vitest" />
export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [vue(), ViteYaml(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }),
);
