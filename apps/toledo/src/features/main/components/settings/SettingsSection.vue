<script setup lang="ts">
import { VCard } from 'vuetify/components';

const { title } = defineProps<{
  title: string;
}>();
</script>

<template>
  <VCard class="mb-2 pb-4 px-4">
    <template v-slot:title>
      <h3>{{ title }}</h3>
    </template>
    <template v-slot:default>
      <slot></slot>
    </template>
  </VCard>
</template>

<style scoped></style>
