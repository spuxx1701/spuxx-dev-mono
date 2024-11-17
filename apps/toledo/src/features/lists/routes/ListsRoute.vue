<script setup lang="ts">
import PageContent from '@/components/content/PageContent.vue';
import { useProtection } from '@/router';
import ListsSidebar from '../sidebar/ListsSidebar.vue';
import ListsView from '../components/ListsView.vue';

useProtection();
</script>

<template>
  <ListsSidebar />
  <PageContent no-padding>
    <ListsView />
  </PageContent>
</template>
