<script lang="ts" setup>
import type { List } from '@/services/api/lists/lists.types';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import type { Ref } from 'vue';
import { VBtn } from 'vuetify/components';

const { list } = defineProps<{
  list: List;
}>();
</script>

<template>
  <VBtn class="w-100 mb-1">
    <Icon icon="mdi:share" />
    {{ intl('lists.route.list.share') }}
  </VBtn>
</template>
