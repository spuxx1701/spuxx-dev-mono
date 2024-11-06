<script setup lang="ts">
import { useRoute } from 'vue-router';
import { intl } from '@spuxx/js-utils';
import { VBtn } from 'vuetify/components';
import PageContent from '@/components/content/PageContent.vue';
import { SessionManager } from '@/services/session';
import { Config } from '@spuxx/browser-utils';
import type { AppConfig } from '@/config/app.config';
import { Icon } from '@iconify/vue/dist/iconify.js';

const route = useRoute();
const { session } = SessionManager;

const handleLogin = () => {
  const { API_URL } = Config.getConfig<AppConfig>();
  const url = `${API_URL}/auth/login?returnTo=${window.location.origin}`;
  window.location.href = url;
};
</script>

<template>
  <PageContent align="center">
    <h1 class="magelove">{{ intl('main.route.login.title') }}</h1>
    <VBtn
      variant="elevated"
      color="primary"
      class="my-4"
      :title="intl('main.route.login.login')"
      @click="handleLogin"
    >
      <Icon icon="mdi:login" />
      <p>{{ intl('main.route.login.login') }}</p>
    </VBtn>
  </PageContent>
</template>

<style scoped></style>
