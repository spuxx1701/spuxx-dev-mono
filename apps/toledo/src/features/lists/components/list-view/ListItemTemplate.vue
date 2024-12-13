<script setup lang="ts">
import { type List, type NewListItem } from '@/services/api/lists/lists.types';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { intl } from '@spuxx/js-utils';
import { ref, useTemplateRef } from 'vue';
import { VBtn, VCard, VForm } from 'vuetify/components';
import ListItemQuantity from './input/ListItemQuantity.vue';
import ListItemText from './input/ListItemText.vue';
import ListItemActions from './ListItemActions.vue';
import { useActiveListStore } from '../../stores/active-list.store';

const store = useActiveListStore();
const form = useTemplateRef<VForm>('form');

function getInitialState(): NewListItem {
  return {
    text: '',
    quantity: 1,
  };
}
const item = ref<NewListItem>(getInitialState());

async function handleSubmit() {
  if ((await form.value?.validate())?.valid) {
    await store.addItem(item.value);
    resetForm();
  }
}

async function resetForm() {
  form.value?.resetValidation();
  item.value = getInitialState();
}
</script>

<template>
  <VForm ref="form" @submit.prevent="handleSubmit" block>
    <VCard variant="flat" color="surface">
      <template v-slot:title>
        <ListItemActions class="pt-2">
          <ListItemQuantity :item use-number-input />
          <ListItemText
            :item
            :label="intl('lists.route.list.item.text.label')"
            :on-submit="handleSubmit"
          />
        </ListItemActions>
      </template>
      <template v-slot:item>
        <ListItemActions>
          <VBtn type="submit" variant="text" :disabled="form?.isValid ? false : true">
            <Icon icon="mdi:plus" />
            <p>{{ intl('lists.route.list.item.create.label') }}</p>
          </VBtn>
        </ListItemActions>
      </template>
    </VCard>
  </VForm>
</template>

<style scoped></style>
