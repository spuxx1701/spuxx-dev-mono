<script setup lang="ts">
import { listValidationRules } from '@/features/lists/validation/list.validation-rules';
import type { ListItem, NewListItem } from '@/services/api/lists/lists.types';
import { intl } from '@spuxx/js-utils';
import { VTextarea } from 'vuetify/components';

const { item, blurOnEnter, onSubmit } = defineProps<{
  item: ListItem | NewListItem;
  blurOnEnter?: boolean;
  onSubmit?: () => void;
}>();

function handleKeydownEnter(event: KeyboardEvent) {
  if (event.shiftKey) return;
  event.preventDefault();
  const input = event.target as HTMLTextAreaElement;
  if (blurOnEnter) input.blur();
  if (onSubmit) onSubmit();
}
</script>

<template>
  <VTextarea
    class="text-field"
    :placeholder="intl('lists.route.list.item.text.placeholder')"
    :rules="listValidationRules.item.text"
    v-model="item.text"
    rows="1"
    auto-grow
    @keydown.enter="handleKeydownEnter"
    :bind="$attrs"
  />
</template>
