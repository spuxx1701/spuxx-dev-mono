<script setup lang="ts">
import { type List, type NewListItem } from '@/services/api/lists/lists.types';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl, isEmptyOrWhitespace } from '@spuxx/js-utils';
import { computed, ref, useTemplateRef } from 'vue';
import { VBtn, VCard, VForm } from 'vuetify/components';
import { ListItemsProvider } from '../../services/list-items.provider';
import ListItemQuantity from './input/ListItemQuantity.vue';
import ListItemText from './input/ListItemText.vue';
import ListItemActions from './ListItemActions.vue';

const { list } = defineProps<{
  list: List;
}>();
const form = useTemplateRef<VForm>('form');

function getInitialState(): NewListItem {
  return {
    text: '',
    quantity: 1,
  };
}
const item = ref<NewListItem>(getInitialState());

const isValid = computed(() => {
  return !isEmptyOrWhitespace(item.value.text) && form.value?.isValid;
});

async function handleSubmit() {
  if (!isValid) return;
  await ListItemsProvider.create(list.id, item.value);
  resetForm();
}

function resetForm() {
  form.value?.resetValidation();
  item.value = getInitialState();
}
</script>

<template>
  <VForm ref="form" @submit.prevent="handleSubmit" block>
    <VCard variant="flat" color="surface" density="compact">
      <template v-slot:title>
        <ListItemActions>
          <ListItemQuantity :list :item :label="intl('lists.route.list.item.quantity.label')" />
          <ListItemText :item :label="intl('lists.route.list.item.text.label')" />
        </ListItemActions>
      </template>
      <template v-slot:item>
        <ListItemActions>
          <VBtn type="submit" variant="text" color="text" :disabled="!isValid">
            <Icon icon="mdi:plus" />
            <p>{{ intl('lists.route.list.item.create.label') }}</p>
          </VBtn>
        </ListItemActions>
      </template>
    </VCard>
  </VForm>
</template>

<style scoped></style>
