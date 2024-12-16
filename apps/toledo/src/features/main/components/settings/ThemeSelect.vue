<script setup lang="ts">
import { useTheme } from 'vuetify';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { VBtn, VBtnToggle } from 'vuetify/components';
import { computed, type Ref } from 'vue';
import { intl } from '@spuxx/js-utils';
import { LocalStorage } from '@/services/local-storage/local-storage.service';
import { Renderer } from '@/services/renderer/renderer.service';

const themeInstance = useTheme();
const { global, themes } = themeInstance;
const themeNames = Object.keys(themes.value);
const currentThemeName = computed(() => global.name.value);
const currentThemeIndex = computed(() => themeNames.indexOf(currentThemeName.value));
function handleSelect(index: number) {
  const selectedThemeName = themeNames[index];
  global.name.value = selectedThemeName;
  LocalStorage.set('theme', selectedThemeName);
  Renderer.updateThemeColor(themeInstance);
}
</script>

<template>
  <h3>{{ intl('main.route.settings.theme.title') }}</h3>
  <VBtnToggle
    class="theme-select"
    variant="elevated"
    v-model="currentThemeIndex"
    @update:model-value="handleSelect"
  >
    <VBtn v-for="name in themeNames" :theme="name" :title="name">
      <Icon v-if="currentThemeName === name" icon="mdi:check-bold"></Icon>
    </VBtn>
  </VBtnToggle>
</template>

<style scoped>
.theme-select {
  :global(> button) {
    padding: 1rem;
    height: 56px !important;
  }
}
</style>
