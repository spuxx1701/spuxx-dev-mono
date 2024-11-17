<script setup lang="ts">
import { intl } from '@spuxx/js-utils';
import ErrorPage from './ErrorPage.vue';
import { VBtn } from 'vuetify/components';
import { SessionManager } from '@/services/session';

function handleLogout() {
  SessionManager.terminate();
}
</script>

<template>
  <ErrorPage :title="intl('error.403.title')" status-code="403">
    <p class="text-center">{{ intl('error.403.description') }}</p>
    <VBtn variant="plain" @click="handleLogout">{{ intl('error.403.suggestion') }}</VBtn>
  </ErrorPage>
</template>
