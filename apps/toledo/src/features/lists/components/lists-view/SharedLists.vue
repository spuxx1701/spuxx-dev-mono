<script setup lang="ts">
import type { List } from '@/services/api/lists/lists.types';
import { SessionManager } from '@/services/session';
import { intl } from '@spuxx/js-utils';
import { computed } from 'vue';
import { VContainer } from 'vuetify/components';
import ListsViewItem from './ListsViewItem.vue';
import CardGrid from '@/components/content/card-grid/CardGrid.vue';
import { ListsProvider } from '../../services/lists.provider';

const sharedLists = computed(() => {
  if (!SessionManager.session.value) return [];
  const { sub } = SessionManager.session.value;
  return ListsProvider.lists.value.filter((list) => list.owner.id !== sub);
});
</script>

<template>
  <VContainer>
    <h1 class="magelove mb-4">{{ intl(`lists.route.index.collection.shared`) }}</h1>
    <CardGrid>
      <i v-if="sharedLists.length === 0">{{ intl(`lists.route.index.collection.empty`) }}</i>
      <ListsViewItem v-for="list in sharedLists" :list="list" />
    </CardGrid>
  </VContainer>
</template>

<style scoped></style>
