import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  './vite.config.nest.ts',
  './vite.config.ts',
  './apps/spuxx-api/vite.config.ts',
  './apps/toledo/vite.config.ts',
]);
