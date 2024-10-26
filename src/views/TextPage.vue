<template>
  <MarkdownViewer :slug="slug" />
</template>

<script>
import MarkdownViewer from '../components/MarkdownViewer.vue';

export default {
  name: 'TextPage',
  props: {
    json: Object,
    slug: String,
  },
  components: {
    MarkdownViewer,
  },
};
</script>

<style scoped></style>
