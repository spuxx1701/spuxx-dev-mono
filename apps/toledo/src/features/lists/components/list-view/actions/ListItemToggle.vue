<script setup lang="ts">
import type { List, ListItem } from '@/services/api/lists/lists.types';
import { useDisplay } from 'vuetify';
import { VBtn } from 'vuetify/components';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import { useActiveListStore } from '@/features/lists/stores/active-list.store';
import { computed } from 'vue';

const store = useActiveListStore();
const { mobile } = useDisplay();
const { list, item } = defineProps<{
  list: List;
  item: ListItem;
}>();

const icon = computed(() => {
  return item.checked ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline';
});

async function handleToggle() {
  item.checked = !item.checked;
  await store.updateItem(item);
}
</script>

<template>
  <VBtn
    v-if="list.usesCheckboxes"
    class="checkbox"
    @click="handleToggle"
    :title="intl(`lists.route.list.item.checked`)"
    hide-details
    :rounded="mobile"
  >
    <Icon :icon />
    <p v-if="!mobile">{{ intl(`lists.route.list.item.checked`) }}</p>
  </VBtn>
</template>

<style scoped>
@media only screen and (max-width: 960px) {
  .checkbox {
    min-width: 36px;
    padding: 0;
  }
}
</style>
