<script lang="ts" setup>
import { useListsStore } from '@/features/lists/stores/lists.store';
import router from '@/router';
import type { List } from '@/services/api/lists/lists.types';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import { ref } from 'vue';
import { VBtn } from 'vuetify/components';

const { list } = defineProps<{ list: List }>();
const store = useListsStore();
const dialog = ref(false);

const handleDeleteClick = () => {
  dialog.value = true;
};

const handleDeleteCancel = () => {
  dialog.value = false;
};

const handleDeleteConfirm = async () => {
  await store.delete(list.id);
  router.replace('/lists');
};
</script>

<template>
  <div v-if="dialog" class="d-flex w-100 ga-4">
    <VBtn class="flex-grow-1" variant="text" @click.stop="handleDeleteCancel">
      <Icon icon="mdi:cancel" />
      {{ intl('lists.route.list.settings.delete.cancel') }}
    </VBtn>
    <VBtn class="flex-grow-1" color="error" @click.stop="handleDeleteConfirm">
      <Icon icon="mdi:delete" />
      {{ intl('lists.route.list.settings.delete.confirm') }}
    </VBtn>
  </div>
  <VBtn v-else class="w-100" variant="text" @click.stop="handleDeleteClick">
    <Icon icon="mdi:delete" />
    {{ intl('lists.route.list.settings.delete.label') }}
  </VBtn>
</template>
