<script setup lang="ts">
import { Dialog } from '@/services/dialog';
import type { DialogOptions } from '@/services/dialog/types';
import { VBtn, VCard, VCardText } from 'vuetify/components';
import DialogTitle from './title/DialogTitle.vue';
import { intl } from '@spuxx/js-utils';

export interface ConfirmDialogOptions extends DialogOptions {
  title: string;
  text: string;
  onConfirm: () => void;
  icon?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}
const { options } = defineProps<{ options: ConfirmDialogOptions }>();

const handleConfirm = () => {
  options.onConfirm();
};
const handleCancel = () => {
  if (options.onCancel) options.onCancel();
  else Dialog.close();
};

const confirmLabel = options.confirmLabel || intl('misc.confirm');
const cancelLabel = options.cancelLabel || intl('misc.cancel');
</script>

<template>
  <VCard>
    <template v-slot:title>
      <DialogTitle :options />
    </template>
    <template v-slot:default>
      <VCardText>{{ options.text }}</VCardText>
    </template>
    <template v-slot:actions>
      <VBtn variant="text" @click="handleCancel">{{ cancelLabel }}</VBtn>
      <VBtn color="primary-darken-1" variant="flat" @click="handleConfirm">{{ confirmLabel }}</VBtn>
    </template>
  </VCard>
</template>

<style scoped></style>
