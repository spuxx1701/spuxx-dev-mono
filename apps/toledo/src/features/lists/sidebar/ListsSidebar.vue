<script setup lang="ts">
import { VDivider, VListItem } from 'vuetify/components';
import { Icon } from '@iconify/vue';
import { intl } from '@spuxx/js-utils';
import SidebarTeleport from '@/components/sidebar/SidebarTeleport.vue';
import ListsSidebarItems from './ListsSidebarItems.vue';
</script>

<template>
  <SidebarTeleport>
    <VListItem link to="/">
      <template v-slot:prepend>
        <Icon icon="mdi:arrow-left" />
      </template>
      {{ intl('lists.sidebar.home') }}
    </VListItem>
    <VDivider />
    <VListItem link to="/lists">
      <template v-slot:prepend>
        <Icon icon="mdi:format-list-bulleted" />
      </template>
      {{ intl('lists.sidebar.lists') }}
    </VListItem>
    <ListsSidebarItems />
  </SidebarTeleport>
</template>
