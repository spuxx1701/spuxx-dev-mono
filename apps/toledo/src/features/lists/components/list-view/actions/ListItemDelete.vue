<script setup lang="ts">
import { ListItemsProvider } from '@/features/lists/services/list-items.provider';
import type { ListItem } from '@/services/api/lists/lists.types';
import { useDisplay } from 'vuetify';
import { VBtn } from 'vuetify/components';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';

const { mobile } = useDisplay();
const { item } = defineProps<{
  item: ListItem;
}>();

async function handleDelete() {
  await ListItemsProvider.delete(item);
}
</script>

<template>
  <VBtn
    v-if="!mobile"
    variant="text"
    :title="intl('lists.route.list.item.delete')"
    @click="handleDelete"
  >
    <Icon icon="mdi:trash" />
    <p>{{ intl('lists.route.list.item.delete') }}</p>
  </VBtn>
</template>

<style scoped></style>
