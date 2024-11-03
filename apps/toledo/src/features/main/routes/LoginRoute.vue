<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { intl, sleep } from '@spuxx/js-utils';
import { VProgressCircular } from 'vuetify/components';
import PageContent from '@/components/app/PageContent.vue';
import { SessionManager } from '@/services/session';

const route = useRoute();
const { session } = SessionManager;

onMounted(async () => {
  const returnTo: string | string[] = route.params.returnTo ?? '/';
  if (session) {
    window.location.href = Array.isArray(returnTo) ? returnTo.join('') : returnTo;
  }
  // else {
  //   await sleep(3000);
  //   window.location.href = Array.isArray(returnTo) ? returnTo.join('') : returnTo;
  // }
});
</script>

<template>
  <!-- <MainSidebar /> -->
  <PageContent align="center">
    <h1 class="magelove">{{ intl('main.route.login.oneMoment') }}</h1>
    <p class="text-center my-2">{{ intl('main.route.login.redirecting') }}</p>
    <VProgressCircular class="my-2" indeterminate />
  </PageContent>
</template>

<style scoped></style>
