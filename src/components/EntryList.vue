<template>
  <ol class="subject-list">
    <li v-for="entry in entries" :key="entry">
      <router-link :to="{ name: 'entry', params: { slug: entry.slug } }">{{ entry.title }}</router-link>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'EntryList',
  components: {
  },
  props: {
    entries: Array,
  },
};
</script>
<style scoped>
@media (min-width: 600px) {
  ol {
    column-count: 2;
    -webkit-column-fill: auto;
    column-fill: auto;
  }
}

@media (min-width: 1200px) {
  ol {
    column-count: 3;
    -webkit-column-fill: auto;
    column-fill: auto;
  }
}
</style>
