<script setup lang="ts">
import { intl, isEmptyOrWhitespace } from '@spuxx/js-utils';
import {
  VAutocomplete,
  VBtn,
  VExpansionPanel,
  VExpansionPanels,
  VForm,
  VSwitch,
} from 'vuetify/components';
import { Icon } from '@iconify/vue/dist/iconify.js';
import ValidatedTextField from '@/components/input/ValidatedTextField.vue';
import { computed, ref, type Ref } from 'vue';
import { Api } from '@/services/api';
import { SessionManager } from '@/services/session';
import type { List } from '@/services/api/lists/lists.types';
import { ListsProvider } from '../../services/lists.provider';
import { listValidationRules } from '../../validation/list.validation-rules';

const { list } = defineProps<{
  list: Ref<List | null>;
}>();

const isOwned = computed(() => {
  return list.value?.owner.id === SessionManager.session.value?.sub;
});
const icons = ref<string[]>([]);

const handleIconSearch = async (value: string) => {
  if (!value || isEmptyOrWhitespace(value) || value.length < 1) return;
  icons.value = [...(await Api.findManyIcons(value))];
};

const handleSettingsChange = async () => {
  if (!list.value || !list.value.icon) return;
  list.value = await ListsProvider.update(list.value);
};

const deleteDialog = ref(false);
const handleDeleteClick = () => {
  deleteDialog.value = true;
};

const handleDeleteCancel = () => {
  deleteDialog.value = false;
};

const handleDeleteConfirm = async () => {
  deleteDialog.value = false;
};
</script>

<template>
  <VExpansionPanels v-if="isOwned && list.value" color="surface">
    <VExpansionPanel class="settings">
      <template v-slot:title>
        <h3>
          <Icon icon="mdi:cog" />
          {{ intl('lists.route.list.settings.title') }}
        </h3>
      </template>
      <template v-slot:text>
        <VForm>
          <ValidatedTextField
            :label="intl('lists.route.list.settings.name.label')"
            v-model="list.value.name"
            :rules="listValidationRules.settings.name"
            validate-on="input eager"
            @change="handleSettingsChange"
          />
          <VAutocomplete
            :label="intl('lists.route.list.settings.icon.label')"
            :items="icons"
            v-model="list.value.icon"
            :rules="listValidationRules.settings.icon"
            validate-on="input eager"
            auto-select-first="exact"
            @update:search.self="handleIconSearch"
            @change="handleSettingsChange"
          />
          <VSwitch
            :label="intl('lists.route.list.settings.uses-quantities.label')"
            v-model="list.value.usesQuantities"
            @change="handleSettingsChange"
          />
          <VSwitch
            :label="intl('lists.route.list.settings.uses-checkboxes.label')"
            v-model="list.value.usesCheckboxes"
            @change="handleSettingsChange"
          />
          <div v-if="deleteDialog" class="d-flex w-100 ga-4">
            <VBtn class="flex-grow-1" color="text" variant="text" @click.stop="handleDeleteCancel">
              <Icon icon="mdi:cancel" />
              {{ intl('lists.route.list.settings.delete.cancel') }}
            </VBtn>
            <VBtn class="flex-grow-1" color="error" @click.stop="handleDeleteConfirm">
              <Icon icon="mdi:delete" />
              {{ intl('lists.route.list.settings.delete.confirm') }}
            </VBtn>
          </div>
          <VBtn v-else class="w-100" color="primary-darken-1" @click.stop="handleDeleteClick">
            <Icon icon="mdi:delete" />
            {{ intl('lists.route.list.settings.delete.label') }}
          </VBtn>
        </VForm>
      </template>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped></style>
