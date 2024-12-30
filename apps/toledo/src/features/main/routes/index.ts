import type { RouteRecordRaw } from 'vue-router';
import HomeRoute from './HomeRoute.vue';
import LoginRoute from './LoginRoute.vue';
import SettingsRoute from './SettingsRoute.vue';
import ForbiddenRoute from './ForbiddenRoute.vue';
import NotFoundRoute from './NotFoundRoute.vue';
import { intl } from '@spuxx/js-utils';

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
    meta: {
      title: intl('main.route.login.title'),
      description: intl('main.route.login.description'),
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsRoute,
    meta: {
      title: intl('main.route.settings.title'),
      description: intl('main.route.settings.description'),
    },
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
