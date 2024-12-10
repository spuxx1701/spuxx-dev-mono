<script lang="ts" setup>
import { Resource } from '@/reactivity/resource';
import type { List } from '@/services/api/lists/lists.types';
import OwnedLists from './lists-view/OwnedLists.vue';
import SharedLists from './lists-view/SharedLists.vue';
import { useListsStore } from '../stores/lists.store';
import ResourceView from '@/components/common/ResourceView.vue';

const store = useListsStore();
const resource = new Resource<List[]>(() => {
  return store.fetch();
}, 'lists');
resource.load();
</script>

<template>
  <ResourceView :resource="resource">
    <OwnedLists />
    <SharedLists />
  </ResourceView>
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
