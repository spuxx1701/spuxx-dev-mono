<script setup lang="ts">
import PageContent from '@/components/content/PageContent.vue';
import { useProtection } from '@/router';
import { intl } from '@spuxx/js-utils';
import MainSidebar from '../sidebar/MainSidebar.vue';
import ThemeSelect from '../components/settings/ThemeSelect.vue';
import About from '../components/settings/About.vue';
import Session from '../components/settings/Session.vue';

useProtection();
</script>

<template>
  <MainSidebar />
  <PageContent :title="intl('main.route.settings.title')" icon="mdi:settings">
    <ThemeSelect />
    <Session />
    <About />
  </PageContent>
</template>

<style scoped></style>
