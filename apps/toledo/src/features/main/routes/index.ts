import type { RouteRecordRaw } from 'vue-router';
import HomeRoute from './HomeRoute.vue';
import LoginRoute from './LoginRoute.vue';
import SettingsRoute from './SettingsRoute.vue';

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeRoute,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginRoute,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsRoute,
  },
];
