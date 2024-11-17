<script setup lang="ts"></script>

<template>
  <div class="actions">
    <slot></slot>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
