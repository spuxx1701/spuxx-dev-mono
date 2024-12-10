import type { RouteRecordRaw } from 'vue-router';
import ListsRoute from './ListsRoute.vue';
import ListRoute from './ListRoute.vue';
import ListInvite from './ListInvite.vue';

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
  {
    path: '/lists/:id/invite',
    name: 'list-invite',
    component: ListInvite,
  },
];
