<script setup lang="ts">
import { intl } from '@spuxx/js-utils';
import { VContainer } from 'vuetify/components';
import ListsViewItem from './ListsViewItem.vue';
import CardGrid from '@/components/content/card-grid/CardGrid.vue';
import { useListsStore } from '../../stores/lists.store';

const store = useListsStore();
</script>

<template>
  <VContainer>
    <h1 class="magelove mb-4">{{ intl(`lists.route.index.collection.shared`) }}</h1>
    <CardGrid>
      <i v-if="store.shared.length === 0">{{ intl(`lists.route.index.collection.empty`) }}</i>
      <ListsViewItem v-for="list in store.shared" :list="list" />
    </CardGrid>
  </VContainer>
</template>

<style scoped></style>
