<script lang="ts" setup>
import { useProtection } from '@/router';
import ListsSidebar from '../sidebar/ListsSidebar.vue';
import { useRoute } from 'vue-router';
import PageContent from '@/components/content/PageContent.vue';
import { ref, watch } from 'vue';
import ListView from '../components/ListView.vue';

useProtection();
const route = useRoute();
const listId = ref<string>(route.params.id as string);

watch(
  () => route.params.id,
  (newId) => {
    listId.value = newId as string;
  },
);
</script>

<template>
  <ListsSidebar />
  <PageContent>
    <ListView v-if="listId" :id="listId" :key="listId" />
  </PageContent>
</template>
