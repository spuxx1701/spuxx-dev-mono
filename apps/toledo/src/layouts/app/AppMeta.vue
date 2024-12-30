<script setup lang="ts">
import router from '@/router';
import { intl } from '@spuxx/js-utils';

router.afterEach((to) => {
  const { title, description } = to.meta as {
    title: string | undefined;
    description: string | undefined;
  };
  if (title) {
    document.title = `${title} | ${intl('app.title')}`;
  } else {
    document.title = intl('app.title');
  }
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) return;
  if (description) {
    metaDescription.setAttribute('content', description);
  } else {
    metaDescription.setAttribute('content', intl('app.description'));
  }
});
</script>
