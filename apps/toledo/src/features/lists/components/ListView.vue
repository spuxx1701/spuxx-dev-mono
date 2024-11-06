<script lang="ts" setup>
import type { List } from '@/services/api/lists/lists.types';
import { intl, isEmptyOrWhitespace } from '@spuxx/js-utils';
import { computed, ref, watch } from 'vue';
import { VAutocomplete, VBtn, VExpansionPanel, VExpansionPanels, VForm } from 'vuetify/components';
import { ListsProvider } from '../services/lists-provider.service';
import { Resource } from '@/reactivity/resource';
import { SessionManager } from '@/services/session';
import { Api } from '@/services/api';
import { listValidationRules } from '../validation/list.validation-rules';
import ContentHeader from '@/components/content/ContentHeader.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import ValidatedTextField from '@/components/input/ValidatedTextField.vue';

const props = defineProps<{
  id: string;
}>();

const list = new Resource(async (id: string) => {
  return ListsProvider.findById(id);
}, 'list');
list.load(props.id);

const icons = ref<string[]>([]);
const isOwned = computed(() => {
  return list.data.value?.owner.id === SessionManager.session.value?.sub;
});

const handleIconSearch = async (value: string) => {
  if (!value || isEmptyOrWhitespace(value) || value.length < 1) return;
  icons.value = [...(await Api.findManyIcons(value))];
};

const handleSettingsChange = async () => {
  if (!list.data.value || !list.data.value.icon) return;
  list.data.value = await ListsProvider.update(list.data.value);
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
  <ContentHeader
    :title="list.data.value?.name"
    :icon="`mdi:${list.data.value?.icon}`"
    :state="list.state.value"
  />
  <div v-if="list.data.value">
    <VBtn class="w-100 mb-1">
      <Icon icon="mdi:share" />
      {{ intl('lists.route.list.share') }}
    </VBtn>
    <VExpansionPanels v-if="isOwned">
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
              v-model="list.data.value.name"
              :rules="listValidationRules.settings.name"
              validate-on="input eager"
              @change="handleSettingsChange"
            />
            <VAutocomplete
              :label="intl('lists.route.list.settings.icon.label')"
              :items="icons"
              v-model="list.data.value.icon"
              :rules="listValidationRules.settings.icon"
              validate-on="input eager"
              auto-select-first="exact"
              @update:search.self="handleIconSearch"
              @change="handleSettingsChange"
            />
            <div v-if="deleteDialog" class="d-flex w-100 ga-4">
              <VBtn
                class="flex-grow-1"
                color="text"
                variant="text"
                @click.stop="handleDeleteCancel"
              >
                <Icon icon="mdi:cancel" />
                {{ intl('lists.route.list.settings.delete.cancel') }}
              </VBtn>
              <VBtn class="flex-grow-1" color="error" @click.stop="handleDeleteConfirm">
                <Icon icon="mdi:delete" />
                {{ intl('lists.route.list.settings.delete.confirm') }}
              </VBtn>
            </div>
            <VBtn v-else class="w-100" color="primary" @click.stop="handleDeleteClick">
              <Icon icon="mdi:delete" />
              {{ intl('lists.route.list.settings.delete.label') }}
            </VBtn>
          </VForm>
        </template>
      </VExpansionPanel>
    </VExpansionPanels>
  </div>
</template>

<style scoped>
.settings {
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
