<script lang="ts" setup>
import { ListsProvider } from '../services/lists.provider';
import { Resource } from '@/reactivity/resource';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ListSettings from './list-view/settings/ListSettings.vue';
import PageLoader from '@/components/common/PageLoader.vue';
import ListItemTemplate from './list-view/ListItemTemplate.vue';
import ListItems from './list-view/ListItems.vue';

const props = defineProps<{
  id: string;
}>();

const list = new Resource(async (id: string) => {
  return ListsProvider.findById(id);
}, 'list');
list.load(props.id);
</script>

<template>
  <ContentHeader :title="list.data.value?.name" :icon="`mdi:${list.data.value?.icon}`" />
  <PageLoader :state="list.state.value" />
  <div class="w-100" v-if="list.data.value">
    <ListItems :list="list.data.value" />
    <ListItemTemplate class="mb-2" :list="list.data.value" />
    <ListSettings :list="list.data" />
  </div>
</template>

<style scoped>
.settings {
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
