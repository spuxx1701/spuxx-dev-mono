<script setup lang="ts">
import AppNavBar from './navbar/AppNavBar.vue';
import AppMainContent from './main-content/AppMainContent.vue';
import AppSidebar from './sidebar/AppSidebar.vue';
import AppDialog from './dialog/AppDialog.vue';
</script>

<template>
  <AppNavBar />
  <AppSidebar />
  <AppDialog />
  <AppMainContent />
  <slot></slot>
</template>
