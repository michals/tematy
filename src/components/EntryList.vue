<template>
  <ol class="subject-list">
    <li
      v-for="(entry, index) in entries"
      :key="entry.slug"
      :value="index + 1"
      :class="{ 'd-none': selectedLetter && getBaseLetter(entry.title) !== selectedLetter }"
    >
      <router-link :to="{ name: 'entry', params: { slug: entry.slug } }">{{ entry.title }}</router-link>
    </li>
  </ol>
</template>

<script>
import getBaseLetter from '../utils/letters';

export default {
  name: 'EntryList',
  components: {
  },
  props: {
    entries: Array,
    selectedLetter: String,
  },
  methods: {
    getBaseLetter,
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
