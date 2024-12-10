<script setup lang="ts">
import { intl } from '@spuxx/js-utils';
import { VContainer } from 'vuetify/components';
import ListsViewItem from './ListsViewItem.vue';
import CreateNewList from './CreateNewList.vue';
import CardGrid from '@/components/content/card-grid/CardGrid.vue';
import { useListsStore } from '../../stores/lists.store';

const store = useListsStore();
</script>

<template>
  <VContainer>
    <h1 class="magelove mb-4">{{ intl(`lists.route.index.collection.owned`) }}</h1>
    <CardGrid>
      <ListsViewItem v-for="list in store.owned" :list="list" />
      <CreateNewList />
    </CardGrid>
  </VContainer>
</template>

<style scoped></style>
