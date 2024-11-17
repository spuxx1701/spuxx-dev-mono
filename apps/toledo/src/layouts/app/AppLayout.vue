<script setup lang="ts">
import AppNavBar from './navbar/AppNavBar.vue';
import AppMainContent from './main-content/AppMainContent.vue';
import AppSidebar from './sidebar/AppSidebar.vue';
</script>

<template>
  <AppNavBar />
  <AppSidebar />
  <AppMainContent />
  <slot></slot>
</template>
