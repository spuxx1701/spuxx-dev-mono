<script setup lang="ts">
import { VCard, VContainer } from 'vuetify/components';

const { title } = defineProps<{
  title: string;
}>();
</script>

<template>
  <VCard class="mb-2 px-4">
    <template v-slot:title>
      <h3>{{ title }}</h3>
    </template>
    <template v-slot:default>
      <VContainer class="pt-0">
        <slot></slot>
      </VContainer>
    </template>
  </VCard>
</template>

<style scoped></style>
