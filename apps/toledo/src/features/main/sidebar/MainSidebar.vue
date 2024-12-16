<script setup lang="ts">
import { VListItem } from 'vuetify/components';
import { Icon } from '@iconify/vue';
import { intl } from '@spuxx/js-utils';
import SidebarTeleport from '@/components/sidebar/SidebarTeleport.vue';
</script>

<template>
  <SidebarTeleport>
    <VListItem link to="/">
      <template v-slot:prepend>
        <Icon icon="mdi:home" />
      </template>
      {{ intl('main.route.index.title') }}
    </VListItem>
    <VListItem link to="/lists">
      <template v-slot:prepend>
        <Icon icon="mdi:list-box" />
      </template>
      {{ intl('lists.route.index.title') }}
    </VListItem>
    <!-- <VListItem link to="/recipes">
      <template v-slot:prepend>
        <Icon icon="mdi:chef-hat" />
      </template>
      {{ intl('recipes.route.index.title') }}
    </VListItem>
    <VListItem link to="/chatbot">
      <template v-slot:prepend>
        <Icon icon="mdi:forum" />
      </template>
      {{ intl('chatbot.route.index.title') }}
    </VListItem> -->
    <VListItem link to="/settings">
      <template v-slot:prepend>
        <Icon icon="mdi:gear" />
      </template>
      {{ intl('main.route.settings.title') }}
    </VListItem>
  </SidebarTeleport>
</template>
