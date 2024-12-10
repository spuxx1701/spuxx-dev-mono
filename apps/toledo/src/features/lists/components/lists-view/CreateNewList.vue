<script setup lang="ts">
import type { NewList } from '@/services/api/lists/lists.types';
import { intl } from '@spuxx/js-utils';
import CardGridElement from '@/components/content/card-grid/CardGridElement.vue';
import { useListsStore } from '../../stores/lists.store';

const store = useListsStore();

const handleCreate = async () => {
  const newList: NewList = {
    name: intl('lists.create.default-name'),
  };
  await store.create(newList);
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
