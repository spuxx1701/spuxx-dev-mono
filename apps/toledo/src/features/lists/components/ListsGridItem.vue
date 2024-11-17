<script lang="ts" setup>
import Loader from '@/components/common/Loader.vue';
import { ResourceState } from '@/reactivity/resource';
import type { List } from '@/services/api/lists/lists.types';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { type Ref } from 'vue';
import { VCard, VCol } from 'vuetify/components';

const props = defineProps<{
  state?: Ref<ResourceState>;
  list?: List;
}>();
</script>

<template>
  <VCol class="col">
    <Loader v-if="state" class="card" type="card-avatar" :state />
    <VCard v-if="list" class="card" color="primary-darken-1" v-bind="$attrs" link>
      <template v-slot:prepend>
        <Icon class="icon" :icon="`mdi:${list.icon}`" />
      </template>
      <template v-slot:item>
        <b>{{ list.name }}</b>
      </template>
    </VCard>
  </VCol>
</template>

<style scoped>
.col {
  flex-grow: unset !important;
  height: fit-content;
}

.card {
  width: 300px;
  max-width: 90vw;

  :global(.v-skeleton-loader__image) {
    display: none;
  }
}

.icon,
.icon :global(.skeleton) {
  font-size: xx-large;
  background: none;
}
</style>
