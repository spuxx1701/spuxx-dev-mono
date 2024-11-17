<script setup lang="ts">
import { listValidationRules } from '@/features/lists/validation/list.validation-rules';
import type { ListItem, NewListItem } from '@/services/api/lists/lists.types';
import { intl } from '@spuxx/js-utils';
import { VTextField } from 'vuetify/components';

const { item } = defineProps<{
  item: ListItem | NewListItem;
}>();
</script>

<template>
  <VTextField
    class="flex-grow-1"
    :placeholder="intl('lists.route.list.item.text.placeholder')"
    :rules="listValidationRules.item.text"
    v-model="item.text"
    :bind="$attrs"
  />
</template>

<style scoped></style>
