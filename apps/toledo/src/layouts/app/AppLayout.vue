<script setup lang="ts">
import AppHeader from './header/AppHeader.vue';
import AppSidebar from './sidebar/AppSidebar.vue';
</script>

<template>
  <AppHeader />
  <AppSidebar />
  <slot></slot>
</template>
