<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useRoute } from 'vue-router';
import { VScrollXTransition } from 'vuetify/components';
import ContentHeader from './ContentHeader.vue';

const props = defineProps<{
  icon?: string;
  title?: string;
  align?: 'start' | 'center';
}>();

const route = useRoute();
</script>

<template>
  <Teleport to="#main-content">
    <VScrollXTransition appear hide-on-leave>
      <div
        :key="route.path"
        :class="`content pa-2 pa-sm-4 pa-md-8 justify-${props.align ?? 'start'}`"
      >
        <ContentHeader v-if="title" :icon :title />
        <slot></slot>
      </div>
    </VScrollXTransition>
  </Teleport>
</template>

<style scoped>
.content {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
