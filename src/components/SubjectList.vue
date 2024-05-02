<template>
  <ol class="subject-list">
    <li v-for="code in codes" :key="code">
      <router-link :to="{ name: 'subject', params: { code: code } }">{{ subjects[code].title }}</router-link>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'VerseList',
  components: {
  },
  props: {
    name: String,
    part: String,
    subjects: Object,
    codes: Array,
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
