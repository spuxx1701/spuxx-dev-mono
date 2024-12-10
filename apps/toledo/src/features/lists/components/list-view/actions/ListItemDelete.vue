<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { VBtn } from 'vuetify/components';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';

const { mobile } = useDisplay();
</script>

<template>
  <VBtn
    v-if="!mobile"
    variant="text"
    :title="intl('lists.route.list.item.delete.label')"
    :bind="$attrs"
  >
    <Icon icon="mdi:trash" />
    <p>{{ intl('lists.route.list.item.delete.label') }}</p>
  </VBtn>
</template>

<style scoped></style>
