<script setup lang="ts">
import AppHeader from './header/AppHeader.vue';
import AppMainContent from './main-content/AppMainContent.vue';
import AppSidebar from './sidebar/AppSidebar.vue';
</script>

<template>
  <AppHeader />
  <AppSidebar />
  <AppMainContent />
  <slot></slot>
</template>
