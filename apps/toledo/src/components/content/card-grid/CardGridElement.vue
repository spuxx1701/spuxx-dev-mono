<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { VCard, VCol } from 'vuetify/components';

const { icon, text } = defineProps<{
  icon: string;
  text: string;
}>();
</script>

<template>
  <VCol class="col">
    <VCard class="card" v-bind="$attrs">
      <template v-slot:actions>
        <Icon :icon />
        <b>{{ text }}</b>
      </template>
    </VCard>
  </VCol>
</template>

<style scoped>
.col {
  min-width: 12rem;
  max-width: 24rem;
}

.card {
  font-size: large;

  :global(.v-card-actions) {
    justify-content: center;
  }
}
</style>
