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
  justify-content: center;
  align-items: end;

  :global(> .v-btn:not(:last-child)) {
    margin-right: 0.5rem;
  }
}
</style>
