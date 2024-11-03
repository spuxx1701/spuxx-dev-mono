<script lang="ts" setup>
import { intl } from '@spuxx/js-utils';
import ListsGridItem from './ListsGridItem.vue';
import type { List } from '@/services/api/lists/lists.types';

const list: List = {
  name: intl('lists.route.index.create'),
  icon: 'plus',
} as List;
</script>

<template>
  <ListsGridItem class="item" :list />
</template>
