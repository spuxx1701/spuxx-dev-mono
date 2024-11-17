<script setup lang="ts">
import { listValidationRules } from '@/features/lists/validation/list.validation-rules';
import type { List, ListItem, NewListItem } from '@/services/api/lists/lists.types';
import { intl } from '@spuxx/js-utils';
import { VNumberInput } from 'vuetify/labs/components';

const { list, item } = defineProps<{
  list: List;
  item: ListItem | NewListItem;
}>();
</script>

<template>
  <VNumberInput
    v-if="list.usesQuantities"
    class="flex-grow-0"
    control-variant="split"
    :placeholder="intl('lists.route.list.item.quantity.label')"
    :rules="listValidationRules.item.quantity"
    :step="1"
    :min="1"
    :max="99"
    v-model="item.quantity"
    :bind="$attrs"
  />
</template>

<style scoped></style>
