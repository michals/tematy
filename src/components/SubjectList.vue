<template>
  <div class="card my-3">
    <div class="card-body">
      <h5>Lista tematów: {{ name }}</h5>
      <ol class="subject-list">
        <li v-for="code in codes" :key="code">
          <a href="#" @click="$emit('changeSubject', part, code);">{{ subjects[code].title
            }}</a>
        </li>
      </ol>
    </div>

  </div>
</template>

<script>
export default {
  name: 'VerseList',
  components: {
  },
  emits: [
    'changeSubject',
  ],
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
  }
}
@media (min-width: 1200px) {
  ol {
    column-count: 3;
    -webkit-column-fill: auto;
  }
}
</style>
