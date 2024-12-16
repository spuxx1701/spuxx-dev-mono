<script setup lang="ts">
import { Resource } from '@/reactivity/resource';
import { Api } from '@/services/api';
import { intl } from '@spuxx/js-utils';
import { computed, ref } from 'vue';
import { VAutocomplete } from 'vuetify/components';

const value = ref<string>('');
const users = computed(() => {
  if (!resource.data.value) return [];
  return resource.data.value.map(
    (user) => `${user.firstName} ${user.familyName} (${user.username})`,
  );
});
const resource = new Resource(() => {
  return Api.findManyUsers();
});
resource.load();
</script>

<template>
  <!-- <VAutocomplete
    :label="intl('component.common.user-select.label')"
    :items="users"
    v-model="value"
    :rules="listValidationRules.settings.icon"
    validate-on="input eager"
    auto-select-first="exact"
    @update:search.self="handleIconSearch"
    @update:model-value="handleUpdate"
  /> -->
</template>

<style scoped></style>
