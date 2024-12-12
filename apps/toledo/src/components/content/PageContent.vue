<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useRoute } from 'vue-router';
import { VContainer, VScrollXTransition } from 'vuetify/components';
import ContentHeader from './ContentHeader.vue';

const { align = 'start' } = defineProps<{
  icon?: string;
  title?: string;
  align?: 'start' | 'center';
  noPadding?: boolean;
}>();

const route = useRoute();
</script>

<template>
  <Teleport to="#main-content">
    <VScrollXTransition appear hide-on-leave>
      <VContainer
        :key="route.path"
        :class="`text-center ${noPadding ? 'pa-0' : ''}`"
        :style="{ alignContent: align }"
        :bind="$attrs"
      >
        <ContentHeader v-if="title" :icon :title />
        <slot></slot>
      </VContainer>
    </VScrollXTransition>
  </Teleport>
</template>

<style scoped></style>
