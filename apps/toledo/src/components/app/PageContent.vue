<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useRoute } from 'vue-router';
import { VScrollXTransition } from 'vuetify/components';

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
      <div :key="route.path" :class="`content pa-2 pa-sm-4 pa-md-8 justify-${props.align ?? 'start'}`">
        <header v-if="title" class="header">
          <h1 class="magelove">
            <Icon v-if="icon" :icon />
            {{ title }}
          </h1>
        </header>
        <slot></slot>
      </div>
    </VScrollXTransition>
  </Teleport>
</template>

<style scoped>
.content {
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  h1 {
    display: flex;
    align-items: center;
    margin: 0.5rem;
    text-align: center;
    position: relative;

    svg {
      margin-right: 0.75rem;
    }
  }
}
</style>
