<script lang="ts" setup>
import { Resource } from '@/reactivity/resource';
import type { List } from '@/services/api/lists/lists.types';
import { computed, onMounted, type Ref } from 'vue';
import { VListItem } from 'vuetify/components';
import { ListsProvider } from '../services/lists-provider.service';
import { Icon } from '@iconify/vue/dist/iconify.js';

const lists = new Resource<Ref<List[]>>(async () => {
  return ListsProvider.findMany();
}, 'lists');

onMounted(() => {
  lists.load();
});
</script>

<template>
  <VListItem v-if="lists.data" v-for="list in lists.data.value" :key="list.id" link :to="`/lists/${list.id}`">
    <template v-slot:prepend>
      <Icon :icon="`mdi:${list.icon}`" />
    </template>
    {{ list.name }}
  </VListItem>
</template>
