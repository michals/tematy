<template>
  <ol class="subject-list">
    <li
      v-for="(subject, index) in subjects"
      :key="subject.s"
      :value="index + 1"
      :class="{ 'd-none': selectedLetter && getBaseLetter(subject.t) !== selectedLetter }"
    >
      <router-link :to="{ name: 'subject', params: { slug: subject.s } }">
        {{ subject.t }}
      </router-link>
    </li>
  </ol>
</template>

<script>
import getBaseLetter from '../utils/letters';

export default {
  name: 'SubjectList',
  components: {
  },
  props: {
    subjects: Array,
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
