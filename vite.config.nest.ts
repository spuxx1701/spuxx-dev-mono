import baseConfig from './vite.config';
import { mergeConfig, defineConfig } from 'vite';

export default mergeConfig(
  baseConfig,
  defineConfig({
    ssr: {
      target: 'node',
      noExternal: ['dotenv'],
    },
    build: {
      ssr: true,
      sourcemap: true,
    },
  }),
);
