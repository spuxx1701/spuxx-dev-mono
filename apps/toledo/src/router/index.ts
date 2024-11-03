import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...mainRoutes],
});

export default router;
export * from './router.hooks';
