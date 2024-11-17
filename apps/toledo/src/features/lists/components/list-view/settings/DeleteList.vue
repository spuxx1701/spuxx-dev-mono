<script lang="ts" setup>
import { ListsProvider } from '@/features/lists/services/lists.provider';
import router from '@/router';
import type { List } from '@/services/api/lists/lists.types';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import { ref } from 'vue';
import { VBtn } from 'vuetify/components';

const { list } = defineProps<{
  list: List;
}>();

const dialog = ref(false);
const handleDeleteClick = () => {
  dialog.value = true;
};

const handleDeleteCancel = () => {
  dialog.value = false;
};

const handleDeleteConfirm = async () => {
  await ListsProvider.delete(list);
  router.replace('/lists');
};
</script>

<template>
  <div v-if="dialog" class="d-flex w-100 ga-4">
    <VBtn class="flex-grow-1" color="text" variant="text" @click.stop="handleDeleteCancel">
      <Icon icon="mdi:cancel" />
      {{ intl('lists.route.list.settings.delete.cancel') }}
    </VBtn>
    <VBtn class="flex-grow-1" color="error" @click.stop="handleDeleteConfirm">
      <Icon icon="mdi:delete" />
      {{ intl('lists.route.list.settings.delete.confirm') }}
    </VBtn>
  </div>
  <VBtn v-else class="w-100" color="text" variant="text" @click.stop="handleDeleteClick">
    <Icon icon="mdi:delete" />
    {{ intl('lists.route.list.settings.delete.label') }}
  </VBtn>
</template>
