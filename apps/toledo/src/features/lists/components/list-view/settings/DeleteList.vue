<script lang="ts" setup>
import ConfirmDialog, { type ConfirmDialogOptions } from '@/components/dialog/ConfirmDialog.vue';
import { useListsStore } from '@/features/lists/stores/lists.store';
import router from '@/router';
import type { List } from '@/services/api/lists/lists.types';
import { Dialog } from '@/services/dialog';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import { VBtn } from 'vuetify/components';

const { list } = defineProps<{ list: List }>();
const store = useListsStore();

const handleDelete = () => {
  Dialog.open<ConfirmDialogOptions>(ConfirmDialog, {
    title: intl('lists.route.list.settings.delete.dialog.title'),
    text: intl('lists.route.list.settings.delete.dialog.text'),
    icon: 'mdi:trash',
    confirmLabel: intl('lists.route.list.settings.delete.label'),
    onConfirm: async () => {
      await store.delete(list.id);
      Dialog.close();
      router.replace('/lists');
    },
  });
};
</script>

<template>
  <VBtn class="w-100" variant="text" @click.stop="handleDelete">
    <Icon icon="mdi:delete" />
    {{ intl('lists.route.list.settings.delete.label') }}
  </VBtn>
</template>
