<script lang="ts" setup>
import { VListItem } from 'vuetify/components';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { SessionManager } from '@/services/session';
import { useListsStore } from '../stores/lists.store';

const store = useListsStore();
store.fetch();
</script>

<template>
  <VListItem v-for="list in store.all" :key="list.id" link :to="`/lists/${list.id}`">
    <template v-slot:prepend>
      <Icon :icon="`mdi:${list.icon}`" />
    </template>
    {{ list.name }}
    <Icon
      v-if="list.owner.id === SessionManager.session.value?.sub"
      class="text-subtitle-2"
      icon="mdi:crown"
    />
  </VListItem>
</template>
