<script setup lang="ts">
import { VAppBar, VBtn } from 'vuetify/components';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
import { intl } from '@spuxx/js-utils';
import { Interface } from '@/services/interface';
import { SessionManager } from '@/services/session';

const { toggleSidebar } = Interface;
const { session } = SessionManager;
</script>
<template>
  <VAppBar v-if="session" class="header" height="60" color="background">
    <template v-slot:prepend>
      <VBtn
        class="sidebar"
        icon
        variant="text"
        :title="intl('app.header.sidebar')"
        :onclick="toggleSidebar"
      >
        <Icon icon="mdi:menu" />
      </VBtn>
      <RouterLink class="brand" to="/">
        <!-- <AppLogo class="logo" :size="40" /> -->
        <p class="title">{{ intl('app.title') }}</p>
      </RouterLink>
    </template>
    <template v-slot:title>
      <!-- <AppNavigation /> -->
    </template>
  </VAppBar>
</template>

<style scoped>
.header {
  background-color: var(--bg-color-container) !important;
}

.brand {
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
}

.title {
  margin-left: 0.5rem;
  font-family: Magelove;
  font-size: x-large;
}

.sidebar {
  margin-left: 0.5rem;
}
</style>
