<script lang="ts" setup>
import type { ResourceState } from '@/reactivity/resource';
import { Icon } from '@iconify/vue/dist/iconify.js';
import Loader from '../common/Loader.vue';

const { title, icon, state } = defineProps<{
  state?: ResourceState;
  icon?: string;
  title?: string;
}>();
</script>

<template>
  <Loader type="heading" class="header" :state />
  <header v-if="title" class="header">
    <h1 class="magelove">
      <Icon v-if="icon" :icon="icon" />
      {{ title }}
    </h1>
  </header>
</template>

<style scoped>
.header {
  min-width: 12rem;
  min-height: 48px;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
    text-align: center;
    position: relative;

    svg {
      margin-right: 0.75rem;
    }
  }

  :global(.v-skeleton-loader__heading) {
    height: 40px;
  }
}
</style>
