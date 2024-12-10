<script lang="ts" setup>
import ConfirmDialog, { type ConfirmDialogOptions } from '@/components/dialog/ConfirmDialog.vue';
import ShareDialog, { type ShareDialogOptions } from '@/components/dialog/ShareDialog.vue';
import { Api } from '@/services/api';
import type { List } from '@/services/api/lists/lists.types';
import { Dialog } from '@/services/dialog';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl, Logger } from '@spuxx/js-utils';
import { ref } from 'vue';
import { VBtn } from 'vuetify/components';

const { list } = defineProps<{
  list: List;
}>();

const handleClick = async () => {
  Dialog.open<ConfirmDialogOptions>(ConfirmDialog, {
    title: intl('lists.route.list.settings.share.confirm.title'),
    icon: 'mdi:share',
    text: intl('lists.route.list.settings.share.confirm.text'),
    onConfirm: async () => {
      const { code } = await Api.generateListInvite(list.id);
      Dialog.close();
      const url = `${window.location.origin}/lists/${list.id}/invite?code=${code}`;
      Logger.debug(`Generated new frontend list invite link: ${url}`, `ShareList`);
      Dialog.open<ShareDialogOptions>(ShareDialog, {
        title: intl('lists.route.list.settings.share.dialog.title'),
        text: intl('lists.route.list.settings.share.dialog.text'),
        url,
      });
    },
  });
};
</script>

<template>
  <VBtn class="w-100 mb-1" @click="handleClick">
    <Icon icon="mdi:share" />
    {{ intl('lists.route.list.share') }}
  </VBtn>
</template>
