<script setup lang="ts">
import { useActiveListStore } from '@/features/lists/stores/active-list.store';
import { listValidationRules } from '@/features/lists/validation/list.validation-rules';
import type { List, ListItem, NewListItem } from '@/services/api/lists/lists.types';
import { intl } from '@spuxx/js-utils';
import { VTextField } from 'vuetify/components';
import { VNumberInput } from 'vuetify/labs/components';

const store = useActiveListStore();
const { item } = defineProps<{
  item: ListItem | NewListItem;
  useNumberInput?: boolean;
  hideDetails?: boolean;
}>();

const emit = defineEmits<{ change: [] }>();

function handleChange() {
  emit('change');
}
</script>

<template>
  <VTextField
    v-if="store.activeList.usesQuantities && !useNumberInput"
    type="number"
    class="text-field flex-grow-0 align-content-end"
    :placeholder="intl('lists.route.list.item.quantity.label')"
    :rules="listValidationRules.item.quantity"
    :min="1"
    :max="99"
    v-model="item.quantity"
    :bind="$attrs"
    :hide-details
    @change="handleChange"
    density="compact"
  >
  </VTextField>
  <VNumberInput
    v-if="store.activeList.usesQuantities && useNumberInput"
    class="number-input flex-grow-0 align-content-end"
    control-variant="split"
    :placeholder="intl('lists.route.list.item.quantity.label')"
    :rules="listValidationRules.item.quantity"
    :step="1"
    :min="1"
    :max="99"
    v-model="item.quantity"
    :bind="$attrs"
    :hide-details
    density="compact"
    @update:modelValue="handleChange"
  />
</template>

<style scoped>
.text-field {
  :global(input) {
    text-align: center;
    width: 3.2rem;
  }
}
</style>
