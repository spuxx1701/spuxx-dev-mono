<script setup lang="ts">
import { useProtection } from '@/router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import ListsSidebar from '../sidebar/ListsSidebar.vue';
import PageContent from '@/components/content/PageContent.vue';
import { Resource } from '@/reactivity/resource';
import { Api } from '@/services/api';
import ResourceView from '@/components/common/ResourceView.vue';
import { intl } from '@spuxx/js-utils';
import { VBtn } from 'vuetify/components';

useProtection();
const route = useRoute();
const listId = ref<string>(route.params.id as string);
const code = ref<string>(route.query.code as string);

const resource = new Resource(() => {
  return Api.acceptListInvite(listId.value, code.value);
});
resource.load();
</script>

<template>
  <ListsSidebar />
  <PageContent>
    <ResourceView :resource>
      <p>{{ intl('lists.route.list-invite.success') }}</p>
      <VBtn
        class="mt-2"
        color="primary-darken-1"
        link
        :to="{ name: 'list', params: { id: listId } }"
        >{{ intl('lists.route.list-invite.to-list') }}</VBtn
      >
    </ResourceView>
  </PageContent>
</template>

<style scoped></style>
