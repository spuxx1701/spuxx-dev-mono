<script setup lang="ts">
import { VAppBar, VBtn } from 'vuetify/components';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
import { intl } from '@spuxx/js-utils';
import { Interface } from '@/services/interface';
import { SessionManager } from '@/services/session';
import { computed } from 'vue';

const { toggleSidebar } = Interface;
const { session } = SessionManager;

const sidebarToggleIcon = computed(() => {
  const { sidebarExpanded } = Interface;
  return sidebarExpanded.value ? 'mdi:menu-open' : 'mdi:menu';
});
</script>
<template>
  <VAppBar v-if="session" height="60" color="surface">
    <template v-slot:prepend>
      <VBtn
        class="sidebar"
        icon
        variant="text"
        color="text"
        :title="intl('app.navbar.toggle-sidebar')"
        :onclick="toggleSidebar"
      >
        <Icon :icon="sidebarToggleIcon" />
      </VBtn>
      <RouterLink class="brand" to="/">
        <!-- <AppLogo class="logo" :size="40" /> -->
        <p class="title">{{ intl('app.title') }}</p>
      </RouterLink>
    </template>
    <template v-slot:title> </template>
  </VAppBar>
</template>

<style scoped>
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
