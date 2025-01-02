<script setup lang="ts">
import AppNavBar from './AppNavBar.vue';
import AppMainContent from './AppMainContent.vue';
import AppSidebar from './AppSidebar.vue';
import AppDialog from './AppDialog.vue';
import AppMeta from './AppMeta.vue';
</script>

<template>
  <AppMeta />
  <AppNavBar />
  <AppSidebar />
  <AppDialog />
  <AppMainContent />
  <slot></slot>
</template>
