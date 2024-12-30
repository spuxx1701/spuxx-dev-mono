import type { RouteRecordRaw } from 'vue-router';
import ListsRoute from './ListsRoute.vue';
import ListRoute from './ListRoute.vue';
import ListInvite from './ListInvite.vue';
import { intl } from '@spuxx/js-utils';

export const listsRoutes: RouteRecordRaw[] = [
  {
    path: '/lists',
    name: 'lists',
    component: ListsRoute,
    meta: {
      title: intl('lists.route.index.title'),
      description: intl('lists.route.index.description'),
    },
  },
  {
    path: '/lists/:id',
    name: 'list',
    component: ListRoute,
    meta: {
      title: intl('lists.route.list.title'),
      description: intl('lists.route.list.description'),
    },
  },
  {
    path: '/lists/:id/invite',
    name: 'list-invite',
    component: ListInvite,
    meta: {
      title: intl('lists.route.list-invite.title'),
      description: intl('lists.route.list-invite.description'),
    },
  },
];
