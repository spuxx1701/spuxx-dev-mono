<script lang="ts" setup>
import { Resource } from '@/reactivity/resource';
import type { List } from '@/services/api/lists/lists.types';
import { VListItem } from 'vuetify/components';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ListsProvider } from '../services/lists.provider';
import { SessionManager } from '@/services/session';

const lists = new Resource<List[]>(async () => {
  return ListsProvider.findMany();
}, 'lists');
lists.load();
</script>

<template>
  <VListItem
    v-if="lists.data"
    v-for="list in lists.data.value"
    :key="list.id"
    link
    :to="`/lists/${list.id}`"
  >
    <template v-slot:prepend>
      <Icon :icon="`mdi:${list.icon}`" />
    </template>
    {{ list.name }}
    <Icon
      v-if="list.owner.id === SessionManager.session.value?.sub"
      class="ml-2 text-subtitle-2"
      icon="mdi:crown"
    />
  </VListItem>
</template>
