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

async function handleToggle() {
  item.checked = !item.checked;
  await ListItemsProvider.update(item);
}
</script>

<template>
  <VBtn
    v-if="list.usesCheckboxes"
    class="flex-grow-1"
    :model-value="item.checked"
    @click="handleToggle"
  >
    <Icon :icon="item.checked ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'" />
    <p>{{ intl(`lists.route.list.item.toggle`) }}</p>
  </VBtn>
</template>

<style scoped></style>
