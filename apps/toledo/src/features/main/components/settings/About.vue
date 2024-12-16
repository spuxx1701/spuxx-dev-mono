<script setup lang="ts">
import { intl } from '@spuxx/js-utils';
import SettingsSection from './SettingsSection.vue';

const version = APP_VERSION;
</script>

<template>
  <SettingsSection :title="intl('main.route.settings.about.title')">
    <p>
      {{ intl('main.route.settings.about.version') }}
      <b>{{ version }}</b>
    </p>
  </SettingsSection>
</template>

<style scoped></style>
