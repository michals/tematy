<template>
  <p>Lista tematów {{ name }}</p>
  <ol class="subject-list">
    <li v-for="item in subjects" :key="item">
      <a href="#todo" :verse="item">{{ item }}</a>
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
    subjects: Array,
  },
};
</script>
<style scoped>
  ol.subject-list {
    display: block;
  }
</style>
