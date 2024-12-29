<script setup lang="ts">
import { Dialog } from '@/services/dialog';
import type { DialogOptions } from '@/services/dialog/types';
import { VBtn, VCard, VCardText, VTextField } from 'vuetify/components';
import DialogTitle from './title/DialogTitle.vue';
import { intl } from '@spuxx/js-utils';
import { Icon } from '@iconify/vue/dist/iconify.js';

export interface ShareDialogOptions extends DialogOptions {
  title: string;
  text: string;
  url: string;
}
const { options } = defineProps<{ options: ShareDialogOptions }>();

const handleCopy = () => {
  if (navigator.share) navigator.share({ url: options.url });
  else navigator.clipboard.writeText(options.url);
};
const handleCancel = () => {
  if (options.onCancel) options.onCancel();
  else Dialog.close();
};
</script>

<template>
  <VCard>
    <template v-slot:title>
      <DialogTitle :options="{ ...options, icon: 'mdi:share' }" />
    </template>
    <template v-slot:default>
      <VCardText
        >{{ options.text }}
        <VTextField
          class="mt-4"
          variant="filled"
          :model-value="options.url"
          hide-details
          readonly
          @click="handleCopy"
        >
          <template v-slot:label>
            <span class="d-inline-flex"
              ><Icon class="mr-1" icon="mdi:link" height="20px"></Icon>
              {{ intl('component.dialog.share.input-label') }}</span
            >
          </template>
        </VTextField>
      </VCardText>
    </template>
    <template v-slot:actions>
      <VBtn variant="text" @click="handleCancel">{{ intl('misc.close') }}</VBtn>
    </template>
  </VCard>
</template>

<style scoped></style>
