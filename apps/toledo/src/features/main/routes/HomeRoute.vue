<script setup lang="ts">
import PageContent from '@/components/content/PageContent.vue';
import { SessionManager } from '@/services/session';
import { useProtection } from '@/router';
import { intl } from '@spuxx/js-utils';
import MainSidebar from '../sidebar/MainSidebar.vue';

useProtection();
const { session } = SessionManager;
</script>

<template>
  <MainSidebar />
  <PageContent
    v-if="session"
    :title="` ${intl('main.route.index.greeting', { name: session.given_name })}`"
  >
  </PageContent>
</template>
