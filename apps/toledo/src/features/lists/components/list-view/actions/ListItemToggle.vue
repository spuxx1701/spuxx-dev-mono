<script setup lang="ts">
import type { List, ListItem } from '@/services/api/lists/lists.types';
import { useDisplay } from 'vuetify';
import { VBtn, VCheckbox } from 'vuetify/components';
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
  <VCheckbox
    v-if="list.usesCheckboxes"
    :model-value="item.checked"
    @click="handleToggle"
    :title="intl(`lists.route.list.item.checked`)"
    hide-details
    density="compact"
  >
    <template v-slot:label v-if="!mobile">
      {{ intl(`lists.route.list.item.checked`) }}
    </template>
  </VCheckbox>
</template>

<style scoped></style>
