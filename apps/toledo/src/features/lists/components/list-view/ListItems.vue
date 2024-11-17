<script setup lang="ts">
import type { List } from '@/services/api/lists/lists.types';
import ListItem from './ListItem.vue';

const { list } = defineProps<{
  list: List;
}>();
</script>

<template>
  <ListItem v-for="item in list.items" :list :item />
</template>

<style scoped></style>
