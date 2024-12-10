<script setup lang="ts">
import { type DialogOptions } from '@/services/dialog';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { VCardTitle } from 'vuetify/components';

const { options } = defineProps<{
  options: DialogOptions;
}>();
const { title, icon } = options;
</script>

<template>
  <VCardTitle class="d-flex justify-space-between align-center">
    <span class="d-flex align-center">
      <Icon v-if="icon" class="mr-2" :icon="icon"></Icon>{{ title }}
    </span>
  </VCardTitle>
</template>

<style scoped></style>
