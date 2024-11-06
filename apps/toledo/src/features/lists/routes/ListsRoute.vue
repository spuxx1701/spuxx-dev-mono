<script setup lang="ts">
import PageContent from '@/components/content/PageContent.vue';
import { useProtection } from '@/router';
import { intl } from '@spuxx/js-utils';
import ListsSidebar from '../sidebar/ListsSidebar.vue';
import ListsGrid from '../components/ListsGrid.vue';

useProtection();
</script>

<template>
  <ListsSidebar />
  <PageContent>
    <ListsGrid collection="owned" />
  </PageContent>
</template>
