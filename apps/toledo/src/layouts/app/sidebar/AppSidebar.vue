<script setup lang="ts">
import { VNavigationDrawer } from 'vuetify/components';
// import AppNavigation from '../navigation/AppNavigation.vue';
import { Interface } from '@/services/interface';
</script>

<template>
  <VNavigationDrawer id="sidebar" v-model="Interface.sidebarExpanded.value" width="350" :disable-resize-watcher="true">
    <!-- <div v-if="mobile"> -->
    <!-- <AppNavigation /> -->
    <!-- <VDivider /> -->
    <!-- </div> -->
    <div id="sidebar-content"></div>
  </VNavigationDrawer>
</template>

<style>
#sidebar {
  .v-list-item__prepend {
    margin-right: 0.5rem;
  }

  .v-list-item-title,
  .v-list-item__content {
    white-space: unset;
  }
}
</style>
