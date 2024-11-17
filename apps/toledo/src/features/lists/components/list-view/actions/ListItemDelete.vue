<script setup lang="ts">
import { ListItemsProvider } from '@/features/lists/services/list-items.provider';
import type { List, ListItem } from '@/services/api/lists/lists.types';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import { VBtn } from 'vuetify/components';

const { list, item } = defineProps<{
  list: List;
  item: ListItem;
}>();

async function handleDelete() {
  await ListItemsProvider.delete(item);
}
</script>

<template>
  <VBtn class="flex-grow-1" variant="text" color="text" @click="handleDelete">
    <Icon icon="mdi:trash" />
    <p>{{ intl('lists.route.list.item.delete') }}</p>
  </VBtn>
</template>

<style scoped></style>
