<script setup lang="ts">
import { Touch } from 'vuetify/directives';
import { computed, ref, useTemplateRef } from 'vue';
import { VCard } from 'vuetify/components';
import { Icon } from '@iconify/vue/dist/iconify.js';
import type { TouchControls } from './types';
import { Interface } from '@/services/interface';

const vTouch = Touch;
const containerRef = useTemplateRef<HTMLElement>('container');

export interface HorizontalTouchAction {
  color: string;
  icon: string;
  label?: string;
  onFinish: () => Promise<void> | void;
}

const { left, right } = defineProps<{
  left: HorizontalTouchAction;
  right: HorizontalTouchAction;
}>();

const xMin = 10;

const deltaX = ref(0);
const absoluteDeltaX = computed(() => Math.abs(deltaX.value));
const leftUnderlayVisible = computed(() => deltaX.value < 0);
const rightUnderlayVisible = computed(() => deltaX.value > 0);

const controls: TouchControls = {
  move: (event) => {
    if (!containerRef.value) return;
    const { touchstartX, touchmoveX } = event;
    deltaX.value = touchmoveX - touchstartX;
    if (absoluteDeltaX.value < xMin) return;
    Interface.registerTouchGesture();
    containerRef.value.style.setProperty('--offset-x', `${deltaX.value}px`);
  },
  end: () => {
    console.log(event);
    if (!containerRef.value) return;
    const threshold = containerRef.value.clientWidth / 2;
    if (deltaX.value < 0 && absoluteDeltaX.value > threshold) {
      left.onFinish();
    } else if (deltaX.value > 0 && absoluteDeltaX.value > threshold) {
      right.onFinish();
    }
    deltaX.value = 0;
    containerRef.value.style.setProperty('--offset-x', '0px');
  },
};
</script>

<template>
  <div ref="container" class="touch-control-horizontal" v-touch="controls">
    <VCard class="underlay left" :color="left.color" :data-visible="leftUnderlayVisible">
      <Icon :icon="left.icon" />
      <p v-if="left.label" class="ma-2">{{ left.label }}</p>
    </VCard>
    <VCard class="underlay right" :color="right.color" :data-visible="rightUnderlayVisible">
      <Icon :icon="right.icon" />
      <p v-if="right.label" class="ma-2">
        {{ right.label }}
      </p>
    </VCard>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.touch-control-horizontal {
  --offset-x: 0px;
  --overlay-left-color: none;
  --overlay-right-color: none;
  position: relative;
}

.content {
  position: static;
  transform: translateX(var(--offset-x));
  transition: transform 100ms;
}

.underlay {
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  justify-content: start;
  padding: 1rem;
  opacity: 0;
  transition: opacity 100ms;
}

.underlay[data-visible='true'] {
  opacity: 1;
}

.left {
  left: 0;
  direction: rtl;
  background-color: var(--overlay-left-color);
}

.right {
  right: 0;
  background-color: var(--overlay-right-color);
}
</style>
