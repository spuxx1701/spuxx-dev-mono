<script setup lang="ts">
import { VNavigationDrawer } from 'vuetify/components';
import { Interface } from '@/services/interface';
</script>

<template>
  <VNavigationDrawer
    id="sidebar"
    v-model="Interface.sidebarExpanded.value"
    width="350"
    :disable-resize-watcher="true"
    color="surface"
  >
    <div id="sidebar-content"></div>
  </VNavigationDrawer>
</template>

<style>
#sidebar {
  z-index: var(--z-index-sidebar);
  max-width: 90vw;

  .v-list-item {
    font-size: larger;
  }

  .v-list-item--active {
    background-color: var(--v-theme-primary) !important;
  }

  .v-list-item__prepend {
    margin-right: 0.5rem;
  }

  .v-list-item__content {
    align-items: center;
  }
}
</style>
