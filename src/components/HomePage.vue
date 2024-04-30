<template>
  <div v-if="subject && subject.part && subject.code">
    <SubjectView :subject="getSubject(subject.part, subject.code)" :title="subject.code" :persons=4 :person=0 />

  </div>
  <div v-else>
    <SubjectList name="Prekatechument" part="prekat" :subjects="getSubjects('prekat')"
      @change-subject="changeSubject" />
    <SubjectList name="Pozostałe" part="reszta" :subjects="getSubjects('reszta')" @change-subject="changeSubject" />

  </div>
</template>

<script>
import SubjectList from './SubjectList.vue';
import SubjectView from './SubjectView.vue';

export default {
  components: {
    SubjectList,
    SubjectView,
  },
  name: 'HomePage',
  methods: {
    async loadSubjects() {
      const response = await fetch('tematy.json');
      const data = await response.json();
      this.tematy = data;
      console.log(data);
    },
    getSubjects(part) {
      if (this.tematy !== null) {
        return Object.keys(this.tematy[part]);
      }
      return [];
    },
    getSubject(part, code) {
      if (this.tematy !== null) {
        return this.tematy[part][code];
      }
      return {
        hd: [], h: [], e: [], n: [],
      };
    },
    clear() {
      this.changeSubject(null, null);
    },
    changeSubject(part, subjectCode) {
      console.log(part, subjectCode);
      this.subject = {
        part,
        code: subjectCode,
      };
    },
  },
  async mounted() {
    await this.loadSubjects();
  },
  data() {
    return {
      tematy: null,
      subject: {
        part: null,
        code: null,
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
