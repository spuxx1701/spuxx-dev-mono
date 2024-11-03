<script setup lang="ts">
import PageContent from '@/components/app/PageContent.vue';
import { useProtection } from '@/router';
import { SessionManager } from '@/services/session';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import { VBtn } from 'vuetify/components';
import MainSidebar from '../sidebar/MainSidebar.vue';

useProtection();
const { session } = SessionManager;
</script>

<template>
  <MainSidebar />
  <PageContent v-if="session" :title="intl('main.route.settings.title')" icon="mdi:account">
    <p>
      {{ intl('main.route.account.loggedInAs') }} <b>{{ session.given_name }}</b>
    </p>
    <VBtn variant="elevated" color="primary" class="my-4" :title="intl('main.route.account.logout')">
      <Icon icon="mdi:logout" />
      <p>{{ intl('main.route.account.logout') }}</p>
    </VBtn>
  </PageContent>
</template>

<style scoped></style>
