<script setup lang="ts">
import type { List, ListItem } from '@/services/api/lists/lists.types';
import { useDisplay } from 'vuetify';
import { VBtn } from 'vuetify/components';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import { useActiveListStore } from '@/features/lists/stores/active-list.store';

const store = useActiveListStore();
const { mobile } = useDisplay();
const { list, item } = defineProps<{
  list: List;
  item: ListItem;
}>();

async function handleToggle() {
  item.checked = !item.checked;
  await store.updateItem(item);
}
</script>

<template>
  <VBtn
    v-if="list.usesCheckboxes"
    :model-value="item.checked"
    @click="handleToggle"
    :title="intl(`lists.route.list.item.checked`)"
  >
    <Icon :icon="item.checked ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'" />
    <p v-if="!mobile">{{ intl(`lists.route.list.item.checked`) }}</p>
  </VBtn>
</template>

<style scoped></style>
