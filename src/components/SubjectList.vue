<template>
  <ol class="subject-list">
    <li v-for="subject in subjects" :key="subject">
      <router-link :to="{ name: 'subject', params: { slug: subject.s } }">
        {{ subject.t }}
      </router-link>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'SubjectList',
  components: {
  },
  props: {
    subjects: Array,
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
