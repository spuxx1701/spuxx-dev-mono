<script setup lang="ts">
import type { List, ListItem } from '@/services/api/lists/lists.types';
import { VForm, VCard } from 'vuetify/components';
import { computed, useTemplateRef } from 'vue';
import ListItemText from './input/ListItemText.vue';
import ListItemQuantity from './input/ListItemQuantity.vue';
import { Interface } from '@/services/interface';
import ListItemActions from './ListItemActions.vue';
import ListItemDelete from './actions/ListItemDelete.vue';
import ListItemToggle from './actions/ListItemToggle.vue';
import HorizontalTouchActions, {
  type HorizontalTouchAction,
} from '@/components/touch/HorizontalTouchActions.vue';
import { intl } from '@spuxx/js-utils';
import { useDisplay } from 'vuetify';
import { useActiveListStore } from '../../stores/active-list.store';
import { Dialog } from '@/services/dialog';
import ConfirmDialog, { type ConfirmDialogOptions } from '@/components/dialog/ConfirmDialog.vue';

const store = useActiveListStore();
const { mobile } = useDisplay();
const { item, list } = defineProps<{
  list: List;
  item: ListItem;
}>();
const form = useTemplateRef<VForm>('form');

async function handleUpdate() {
  if ((await form.value?.validate())?.valid) {
    await store.updateItem(item);
    Interface.unfocusActiveElement();
  }
}

async function handleDelete() {
  if (list.requiresDeleteConfirmation) {
    Dialog.open<ConfirmDialogOptions>(ConfirmDialog, {
      title: intl('lists.route.list.item.delete.dialog.title'),
      text: intl('lists.route.list.item.delete.dialog.text'),
      icon: 'mdi:trash',
      confirmLabel: intl('lists.route.list.item.delete.label'),
      confirmColor: 'error',
      onConfirm: async () => {
        await store.deleteItem(item);
        Dialog.close();
      },
    });
  } else {
    await store.deleteItem(item);
  }
}

const leftTouchAction = computed<HorizontalTouchAction>(() => {
  return {
    icon: item.checked ? 'mdi:checkbox-blank-outline' : 'mdi:checkbox-marked',
    label: intl('lists.route.list.item.checked'),
    color: 'success',
    onFinish: async () => {
      item.checked = !item.checked;
      await handleUpdate();
    },
  };
});

const rightTouchAction: HorizontalTouchAction = {
  icon: 'mdi:trash',
  label: intl('lists.route.list.item.delete.label'),
  color: 'error',
  onFinish: handleDelete,
};
</script>

<template>
  <VForm ref="form" @submit.prevent="handleUpdate" validate-on="blur" block>
    <HorizontalTouchActions :left="leftTouchAction" :right="rightTouchAction">
      <VCard class="card mb-2" variant="flat" color="surface" :data-checked="item.checked">
        <template v-slot:title>
          <ListItemActions>
            <ListItemToggle :list :item />
            <ListItemDelete @click="handleDelete" />
            <ListItemQuantity
              :list
              :item
              :use-number-input="!mobile"
              @change="handleUpdate"
              hide-details
            />
            <ListItemText :item @change="handleUpdate" blur-on-enter hide-details />
          </ListItemActions>
        </template>
        <template v-slot:item>
          <button type="submit" hidden></button>
        </template>
      </VCard>
    </HorizontalTouchActions>
  </VForm>
</template>

<style scoped>
.card {
  :global(.v-card__underlay) {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgb(var(--v-theme-background));
    pointer-events: none;
    opacity: 0;
  }
}

.card[data-checked='true'] {
  :global(.v-card__underlay) {
    opacity: 0.5 !important;
  }
}
</style>
