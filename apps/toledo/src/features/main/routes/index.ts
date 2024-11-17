import type { RouteRecordRaw } from 'vue-router';
import HomeRoute from './HomeRoute.vue';
import LoginRoute from './LoginRoute.vue';
import SettingsRoute from './SettingsRoute.vue';
import ForbiddenRoute from './ForbiddenRoute.vue';
import NotFoundRoute from './NotFoundRoute.vue';

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
  {
    path: '/forbidden',
    name: 'forbidden',
    component: ForbiddenRoute,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => NotFoundRoute,
  },
];
