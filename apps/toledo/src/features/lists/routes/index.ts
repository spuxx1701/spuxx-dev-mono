import type { RouteRecordRaw } from 'vue-router';
import ListsRoute from './ListsRoute.vue';

export const listsRoutes: RouteRecordRaw[] = [
  {
    path: '/lists',
    name: 'lists',
    component: ListsRoute,
  },
];
