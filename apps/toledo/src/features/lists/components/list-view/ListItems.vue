<script setup lang="ts">
import ListItem from './ListItem.vue';
import { useActiveListStore } from '../../stores/active-list.store';

const store = useActiveListStore();
</script>

<template>
  <ListItem v-for="item in store.items" :list="store.activeList!" :item />
</template>

<style scoped></style>
