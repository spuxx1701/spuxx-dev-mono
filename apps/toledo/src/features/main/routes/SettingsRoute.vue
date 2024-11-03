<script setup lang="ts">
import PageContent from '@/components/app/PageContent.vue';
import { useProtection } from '@/router';
import { SessionManager } from '@/services/session';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import { VBtn } from 'vuetify/components';
import MainSidebar from '../sidebar/MainSidebar.vue';
import { Config } from '@spuxx/browser-utils';
import type { AppConfig } from '@/config/app.config';

useProtection();
const { session } = SessionManager;

const handleLogout = () => {
  const { API_URL } = Config.getConfig<AppConfig>();
  const url = `${API_URL}/auth/logout?returnTo=${window.location.origin}`;
  window.location.href = url;
};
</script>

<template>
  <MainSidebar />
  <PageContent v-if="session" :title="intl('main.route.settings.title')" icon="mdi:settings">
    <p>
      {{ intl('main.route.settings.signed-in-as') }} <b>{{ session.given_name }}</b>
    </p>
    <VBtn
      variant="elevated"
      color="primary"
      class="my-4"
      :title="intl('main.route.settings.logout')"
      @click="handleLogout"
    >
      <Icon icon="mdi:logout" />
      <p>{{ intl('main.route.settings.logout') }}</p>
    </VBtn>
  </PageContent>
</template>

<style scoped></style>
