<script lang="ts" setup>
import { Resource } from '@/reactivity/resource';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ListSettings from './list-view/settings/ListSettings.vue';
import ListItemTemplate from './list-view/ListItemTemplate.vue';
import ListItems from './list-view/ListItems.vue';
import { useActiveListStore } from '../stores/active-list.store';
import ResourceView from '@/components/common/ResourceView.vue';
import { computed } from 'vue';

const { id } = defineProps<{
  id: string;
}>();

const store = useActiveListStore();
const list = computed(() => store.list);
const resource = new Resource((id: string) => {
  return store.fetch(id);
}, 'active-list');
resource.load(id);
</script>

<template>
  <ContentHeader v-if="list" :title="list.name" :icon="`mdi:${list.icon}`" />
  <ResourceView :resource>
    <ListItems />
    <ListItemTemplate v-if="list" :list="list" class="mb-2" />
    <ListSettings v-if="list" :list="list" :update="store.update" />
  </ResourceView>
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
