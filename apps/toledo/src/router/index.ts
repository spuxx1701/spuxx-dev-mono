import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/routes';
import { listsRoutes } from '@/features/lists/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...mainRoutes, ...listsRoutes],
});

export default router;
export * from './router.hooks';
