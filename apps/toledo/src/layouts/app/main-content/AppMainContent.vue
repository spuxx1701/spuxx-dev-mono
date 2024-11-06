<script setup lang="ts">
import { VMain } from 'vuetify/components';
</script>
<template>
  <VMain id="main-content" color="background"></VMain>
</template>

<style>
#main-content {
  max-width: 1440px;
  width: calc(100% - var(--v-layout-left));
  margin: auto;
  z-index: var(--z-index-main-content);
  display: flex;
  justify-content: center;
  box-sizing: content-box;
}
</style>
