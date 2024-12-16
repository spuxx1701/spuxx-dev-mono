<script setup lang="ts">
import type { AppConfig } from '@/config/app.config';
import { SessionManager } from '@/services/session';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { Config } from '@spuxx/browser-utils';
import { intl } from '@spuxx/js-utils';
import { VBtn } from 'vuetify/components';
import SettingsSection from './SettingsSection.vue';

const { session } = SessionManager;
const { ACCOUNT_SERVICE_URL, API_URL } = Config.getConfig<AppConfig>();

const handleLogout = () => {
  const { API_URL } = Config.getConfig<AppConfig>();
  const url = `${API_URL}/auth/logout?returnTo=${window.location.origin}`;
  window.location.href = url;
};
</script>

<template>
  <SettingsSection v-if="session" :title="intl('main.route.settings.session.title')">
    <p>{{ intl('main.route.settings.session.text') }}</p>
    <p>
      {{ intl('main.route.settings.session.name') }}
      <b>{{ session.given_name }}</b>
    </p>
    <p>
      {{ intl('main.route.settings.session.username') }}
      <b>{{ session.preferred_username }}</b>
    </p>
    <VBtn color="primary-darken-1" class="mt-2" :href="ACCOUNT_SERVICE_URL" target="_blank">
      <Icon icon="mdi:account" />
      <p>{{ intl('main.route.settings.session.account-service') }}</p>
    </VBtn>
    <VBtn color="primary-darken-1" class="mt-2" @click="handleLogout">
      <Icon icon="mdi:logout" />
      <p>{{ intl('main.route.settings.session.logout') }}</p>
    </VBtn>
  </SettingsSection>
</template>

<style scoped></style>
