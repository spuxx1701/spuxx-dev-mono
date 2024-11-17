<script setup lang="ts">
import type { List, ListItem } from '@/services/api/lists/lists.types';
import { VForm, VCard, VBtn, VBtnToggle } from 'vuetify/components';
import { computed, useTemplateRef } from 'vue';
import ListItemText from './input/ListItemText.vue';
import ListItemQuantity from './input/ListItemQuantity.vue';
import { intl, isEmptyOrWhitespace } from '@spuxx/js-utils';
import { ListItemsProvider } from '../../services/list-items.provider';
import { Interface } from '@/services/interface';
import ListItemActions from './ListItemActions.vue';
import ListItemDelete from './actions/ListItemDelete.vue';
import ListItemToggle from './actions/ListItemToggle.vue';

const { item, list } = defineProps<{
  list: List;
  item: ListItem;
}>();
const form = useTemplateRef<VForm>('form');

const isValid = computed(() => {
  return !isEmptyOrWhitespace(item.text) && form.value?.isValid;
});

async function handleUpdate() {
  if (!isValid) return;
  await ListItemsProvider.update(item);
  Interface.unfocusActiveElement();
}
</script>

<template>
  <VForm ref="form" @submit.prevent="handleUpdate" block>
    <VCard
      class="card mb-2"
      :data-checked="item.checked"
      variant="flat"
      color="surface"
      density="compact"
    >
      <template v-slot:title>
        <ListItemActions>
          <ListItemQuantity :list :item @update:modelValue="handleUpdate" />
          <ListItemText :item />
        </ListItemActions>
      </template>
      <template v-slot:item>
        <ListItemActions>
          <ListItemToggle :list :item />
          <ListItemDelete :list :item />
        </ListItemActions>
        <button type="submit" hidden></button>
      </template>
    </VCard>
  </VForm>
</template>

<style scoped>
.card[data-checked='true'] {
  opacity: 0.5;
}
</style>
