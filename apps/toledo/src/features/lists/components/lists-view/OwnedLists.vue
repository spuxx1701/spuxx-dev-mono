<script setup lang="ts">
import type { List } from '@/services/api/lists/lists.types';
import { SessionManager } from '@/services/session';
import { intl } from '@spuxx/js-utils';
import { computed } from 'vue';
import { VContainer } from 'vuetify/components';
import ListsViewItem from './ListsViewItem.vue';
import CreateNewList from './CreateNewList.vue';
import CardGrid from '@/components/content/card-grid/CardGrid.vue';
import { ListsProvider } from '../../services/lists.provider';

const ownedLists = computed(() => {
  if (!SessionManager.session.value) return [];
  const { sub } = SessionManager.session.value;
  return ListsProvider.lists.value.filter((list) => list.owner.id === sub);
});
</script>

<template>
  <VContainer>
    <h1 class="magelove mb-4">{{ intl(`lists.route.index.collection.owned`) }}</h1>
    <CardGrid>
      <ListsViewItem v-for="list in ownedLists" :list="list" />
      <CreateNewList />
    </CardGrid>
  </VContainer>
</template>

<style scoped></style>
