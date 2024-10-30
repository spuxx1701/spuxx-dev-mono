<script setup lang="ts">
import { VAppBar, VBtn } from 'vuetify/components';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
import { intl } from '@spuxx/js-utils';
import { Interface } from '@/services/interface';

const { toggleSidebar } = Interface;
</script>
<template>
  <VAppBar class="header">
    <template v-slot:prepend>
      <VBtn class="sidebar" icon variant="text" :title="intl('app.header.sidebar')" :onclick="toggleSidebar">
        <Icon icon="mdi:menu" />
      </VBtn>
      <RouterLink class="brand" to="/">
        <AppLogo class="logo" :size="40" />
        <p class="title">{{ intl('app.title') }}</p>
      </RouterLink>
    </template>
    <template v-slot:title>
      <AppNavigation />
    </template>
    <template v-slot:append>
      <VBtn class="account" icon variant="text" :title="intl('app.header.account')">
        <Icon icon="mdi:account" />
      </VBtn>
    </template>
  </VAppBar>
</template>

<style scoped>
.header :global(.v-toolbar__prepend .v-divider) {
  margin-left: 16px;
}

.header :global(.v-divider) {
  height: 60%;
  margin: auto 0.25rem;
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
  font-size: xx-large;
}

.sidebar {
  margin-left: 0.5rem;
  font-size: xx-large;
}

.account {
  margin-right: 0.5rem;
  font-size: xx-large;
}
</style>
