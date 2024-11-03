<script setup lang="ts">
import { VNavigationDrawer } from 'vuetify/components';
// import AppNavigation from '../navigation/AppNavigation.vue';
import { Interface } from '@/services/interface';
</script>

<template>
  <VNavigationDrawer
    id="sidebar"
    v-model="Interface.sidebarExpanded.value"
    width="350"
    :disable-resize-watcher="true"
    color="background"
  >
    <!-- <div v-if="mobile"> -->
    <!-- <AppNavigation /> -->
    <!-- <VDivider /> -->
    <!-- </div> -->
    <div id="sidebar-content"></div>
  </VNavigationDrawer>
</template>

<style>
#sidebar {
  z-index: var(--z-index-sidebar);
  background-color: var(--bg-color-container) !important;
  max-width: 90vw;

  .v-list-item {
    color: var(--v-theme-content);
    font-size: larger;
  }

  .v-list-item--active {
    color: var(--v-theme-accent) !important;
  }

  .v-list-item__prepend {
    margin-right: 0.5rem;
  }

  .v-list-item-title,
  .v-list-item__content {
    white-space: unset;
  }
}
</style>
