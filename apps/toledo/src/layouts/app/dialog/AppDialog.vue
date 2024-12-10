<script setup lang="ts">
import { DialogSize } from '@/services/dialog';
import { Dialog } from '@/services/dialog/dialog.service';
import { computed } from 'vue';
import { VDialog } from 'vuetify/components';

const showDialog = computed(() => Dialog.activeDialogComponent !== null);
const is = computed(() => Dialog.activeDialogComponent);
const options = computed(() => Dialog.activeDialogOptions);
</script>

<template>
  <VDialog
    v-model="showDialog"
    close-on-back
    :max-width="options?.size ?? DialogSize.small"
    :persistent="options?.persistent"
  >
    <component :is :options />
  </VDialog>
</template>

<style scoped></style>
