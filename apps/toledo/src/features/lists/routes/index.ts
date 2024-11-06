import type { RouteRecordRaw } from 'vue-router';
import ListsRoute from './ListsRoute.vue';
import ListRoute from './ListRoute.vue';

export const listsRoutes: RouteRecordRaw[] = [
  {
    path: '/lists',
    name: 'lists',
    component: ListsRoute,
  },
  {
    path: '/lists/:id',
    name: 'list',
    component: ListRoute,
  },
];
