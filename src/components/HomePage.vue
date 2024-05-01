<template>
  <div v-if="subject && subject.part && subject.code">
    <SubjectView :subject="getSubject(subject.part, subject.code)" :persons="persons" :person=0 />

  </div>
  <div v-else>
    <SubjectList part="prekat" :subjects="getSubjects('prekat')" :codes="getCodes('prekat')"
      @change-subject="changeSubject" name="Prekatechument" />
    <SubjectList part="reszta" :subjects="getSubjects('reszta')" :codes="getCodes('reszta')"
      @change-subject="changeSubject" name="Pozostałe" />

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
    getCodes(part) {
      if (this.tematy !== null) {
        return Object.keys(this.tematy[part]);
      }
      return [];
    },
    getSubjects(part) {
      if (this.tematy === null) return [];
      return this.tematy[part];
    },
    getSubject(part, code) {
      const subjects = this.getSubjects(part);
      if (subjects.length === 0) {
        return {
          title: '', hd: [], h: [], e: [], n: [],
        };
      }
      return subjects[code];
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
      persons: 5,
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
