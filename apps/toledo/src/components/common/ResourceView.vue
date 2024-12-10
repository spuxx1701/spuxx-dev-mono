<script setup lang="ts">
import { ResourceState, type Resource } from '@/reactivity/resource';
import Loader, { type LoaderType } from './Loader.vue';
import { computed } from 'vue';
import { VContainer } from 'vuetify/components';
import { intl, type HttpError } from '@spuxx/js-utils';
import { Icon } from '@iconify/vue/dist/iconify.js';

const { resource, loaderType = 'spinner' } = defineProps<{
  resource: Resource<any, any>;
  loaderType?: LoaderType;
}>();

const showContent = computed(() => resource.state.value === ResourceState.success);
const error = computed(() => resource.error.value as HttpError);
</script>

<template>
  <Loader class="loader" :type="loaderType" :state="resource.state" />
  <slot name="default" v-if="showContent"></slot>
  <VContainer v-if="error">
    <p><Icon icon="mdi:sync-alert" height="2rem"></Icon></p>
    <i v-if="error.status" class="text-medium-emphasis">{{ error.status }} {{ error.message }}</i>
    <p>{{ intl('error.resource.text') }}</p>
  </VContainer>
</template>

<style scoped>
.loader {
  position: fixed;
  left: 50%;
  top: 33%;
  transform: translate(-50%, -33%);
}
</style>
