<script setup lang="ts">
import type { ResourceState } from '@/reactivity/resource';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import { VSkeletonLoader } from 'vuetify/components';
export type LoaderType = VProp<typeof VSkeletonLoader, 'type'> | 'spinner';

const { state, type = 'spinner' } = defineProps<{
  state?: ResourceState;
  type?: LoaderType;
}>();
</script>
<template>
  <span v-if="state === 'pending'" class="loader" :aria-label="intl('misc.loading')" :bind="$attrs">
    <Icon v-if="type === 'spinner'" class="spinner" icon="svg-spinners:270-ring" />
    <VSkeletonLoader class="skeleton" v-else :type="type" />
  </span>
</template>
<style scoped>
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.spinner {
  font-size: x-large;
}
.skeleton {
  width: 100%;
}
</style>
