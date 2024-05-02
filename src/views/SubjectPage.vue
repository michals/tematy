<template>
  <!-- <div v-if="subject && subject.part && subject.code">
    <SubjectView v-on="['personChanged', handlePersonChange]" :subject="subject" :persons="persons" :person=0 />
  </div>
  <div v-else>
    <SubjectView v-on="['personChanged', handlePersonChange]" :subject="subject" :persons="persons" :person=0 />
</div> -->
<SubjectView v-on="['personChanged', handlePersonChange]" :subject="subject" :persons="persons" :person="person" />
</template>

<script>
import SubjectView from '../components/SubjectView.vue';

export default {
  components: {
    SubjectView,
  },
  name: 'SubjectPage',
  props: {
    persons: Number,
    person: Number,
    code: String, // subject code
  },
  computed: {
    subject() {
      if (this.subjects === null) {
        return {
          title: '...', hd: [], p: [], e: [], n: [], ps: [],
        };
      }
      return this.subjects[this.code];
    },
  },
  methods: {
    async loadSubjects() {
      const response = await fetch('tematy.json');
      const data = await response.json();
      this.subjects = { ...data.prekat, ...data.reszta };
      this.codes = {
        prekat: Object.keys(data.prekat),
        reszta: Object.keys(data.reszta),
      };
    },
    clear() {
      this.changeSubject(null, null);
    },
    handlePersonChange(value) {
      console.log('value', value);
    },
  },
  async mounted() {
    await this.loadSubjects();
    console.log('[mounted SubjectPage.vue]', this.subject, this.persons, this.person);
  },
  data() {
    return {
      subjects: null,
      codes: {
        prekat: [],
        reszta: [],
      },
    };
  },
};
</script>

<style scoped></style>
