<template>
  <ul class="verse-list">
    <li v-for="item in verses" :key="item">
      <VerseLink :verse="item" />
    </li>
  </ul>
</template>

<script>
import VerseLink from './VerseLink.vue';

export default {
  name: 'VerseList',
  components: {
    VerseLink,
  },
  props: {
    verses: Array,
  },
};
</script>
<style scoped>
  ul.verse-list {
    display: inline-block;
  }
</style>
