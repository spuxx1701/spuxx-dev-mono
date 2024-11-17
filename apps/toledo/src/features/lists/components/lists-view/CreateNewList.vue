<script setup lang="ts">
import type { NewList } from '@/services/api/lists/lists.types';
import { intl } from '@spuxx/js-utils';
import { ListsProvider } from '../../services/lists.provider';
import CardGridElement from '@/components/content/card-grid/CardGridElement.vue';

const handleCreate = async () => {
  const newList: NewList = {
    name: intl('lists.create.default-name'),
  };
  await ListsProvider.create(newList);
};
</script>

<template>
  <CardGridElement
    variant="outlined"
    icon="mdi:plus"
    :text="intl('lists.route.index.create')"
    @click.stop="handleCreate"
  />
</template>

<style scoped></style>
