<script lang="ts" setup>
import CardGridElement from '@/components/content/card-grid/CardGridElement.vue';
import type { List } from '@/services/api/lists/lists.types';

const { list } = defineProps<{
  list: List;
}>();
</script>

<template>
  <CardGridElement :icon="`mdi:${list.icon}`" :text="list.name" link :to="`/lists/${list.id}`" />
</template>

<style scoped></style>
