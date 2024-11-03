<script lang="ts" setup>
import { type Ref } from 'vue';
import { ListsProvider } from '../services/lists-provider.service';
import { Resource, ResourceState } from '@/reactivity/resource';
import type { List, NewList } from '@/services/api/lists/lists.types';
import { VRow } from 'vuetify/components';
import ListsGridItem from './ListsGridItem.vue';
import ListsGridItemCreate from './ListsGridItemCreate.vue';
import { intl } from '@spuxx/js-utils';

const props = defineProps<{
  collection: 'owned' | 'shared';
}>();

const lists = new Resource<Ref<List[]>>(async () => {
  return ListsProvider.findMany();
}, 'lists');

lists.load();

const handleCreate = async () => {
  const newList: NewList = {
    name: intl('lists.create.default-name'),
  };
  await ListsProvider.create(newList);
};
</script>

<template>
  <h1 class="magelove mb-4">{{ intl(`lists.route.index.collection.${collection}`) }}</h1>
  <VRow class="row" dense v-if="lists.state.value === ResourceState.pending">
    <ListsGridItem :state="lists.state" />
    <ListsGridItemCreate v-if="props.collection === 'owned'" variant="outlined" @click.stop="handleCreate" />
  </VRow>
  <VRow class="row" dense v-if="lists.data">
    <ListsGridItem
      v-for="list in lists.data.value"
      :key="list.id"
      :list="list"
      :to="`/lists/${list.id}`"
      variant="flat"
    />
    <ListsGridItemCreate v-if="props.collection === 'owned'" variant="outlined" @click.stop="handleCreate" />
  </VRow>
</template>

<style scoped>
.row {
  flex: unset !important;
  justify-content: center;
}
</style>
