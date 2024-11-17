<script setup lang="ts">
defineProps<{
  title: string;
  statusCode?: string;
}>();
</script>

<template>
  <p v-if="statusCode" class="status">{{ statusCode }}</p>
  <h1 class="title">{{ title }}</h1>
  <slot></slot>
</template>

<style scoped>
.status {
  font-size: 100px;
  font-weight: bold;
  opacity: 0.5;
}
</style>
