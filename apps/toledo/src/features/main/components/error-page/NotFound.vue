<script setup lang="ts">
import { intl } from '@spuxx/js-utils';
import ErrorPage from './ErrorPage.vue';
import { VBtn } from 'vuetify/components';
</script>

<template>
  <ErrorPage :title="intl('error.404.title')" status-code="404">
    <p class="text-center">{{ intl('error.404.description') }}</p>
    <VBtn link to="/" variant="plain">{{ intl('error.404.suggestion') }}</VBtn>
  </ErrorPage>
</template>
