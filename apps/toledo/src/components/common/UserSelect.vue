<script setup lang="ts">
import { Resource } from '@/reactivity/resource';
import { Api } from '@/services/api';
import type { User } from '@/services/api/users/users.types';
import { intl } from '@spuxx/js-utils';
import { ref } from 'vue';
import { VAutocomplete } from 'vuetify/components';

const emit = defineEmits<{
  (e: 'select', user: User): void;
}>();

const resource = new Resource(() => {
  return Api.findManyUsers();
});
resource.load();

const getCaption = (user: User | null) => {
  if (!user) return '';
  return `${user.firstName} ${user.familyName} (${user.username})`;
};
const selectedUser = ref<User | null>(null);

const handleUpdate = (user: User | null) => {
  if (user) {
    selectedUser.value = user;
    emit('select', selectedUser.value);
  }
};
</script>

<template>
  <VAutocomplete
    :label="intl('component.common.user-select.label')"
    :items="resource.data.value ?? []"
    :model-value="selectedUser"
    :item-title="getCaption"
    :return-object="true"
    validate-on="input eager"
    auto-select-first="exact"
    @update:model-value="handleUpdate"
    v-bind="$attrs"
  />
</template>

<style scoped></style>
