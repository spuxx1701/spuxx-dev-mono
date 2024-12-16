<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VApp } from 'vuetify/components';
import AppLayout from './layouts/app/AppLayout.vue';
import { Renderer } from './services/renderer/renderer.service';
import { useTheme } from 'vuetify';

Renderer.updateThemeColor(useTheme());
</script>

<template>
  <VApp>
    <AppLayout>
      <RouterView />
    </AppLayout>
  </VApp>
</template>
