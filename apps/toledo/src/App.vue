<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VApp } from 'vuetify/components';
import AppLayout from './layouts/app/AppLayout.vue';
</script>

<template>
  <VApp>
    <AppLayout>
      <RouterView />
    </AppLayout>
  </VApp>
</template>
