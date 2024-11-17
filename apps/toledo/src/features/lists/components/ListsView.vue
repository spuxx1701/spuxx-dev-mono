<script lang="ts" setup>
import { ListsProvider } from '../services/lists.provider';
import { Resource } from '@/reactivity/resource';
import type { List } from '@/services/api/lists/lists.types';
import OwnedLists from './lists-view/OwnedLists.vue';
import PageLoader from '@/components/common/PageLoader.vue';
import SharedLists from './lists-view/SharedLists.vue';

const lists = new Resource<List[]>(async () => {
  return ListsProvider.findMany();
}, 'lists');
lists.load();
</script>

<template>
  <PageLoader :state="lists.state" />
  <OwnedLists v-if="lists.data.value" :lists="lists.data.value" />
  <SharedLists v-if="lists.data.value" :lists="lists.data.value" />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  flex: unset !important;
  justify-content: center;
}
</style>
