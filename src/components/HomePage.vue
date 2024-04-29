<template>
  <SubjectView :subject="getSubject('prekat', 'SKAŁA')" title="Skała" />
  <hr />
  <SubjectList name="Prekatechument" :subjects="getSubjects('prekat')" />
  <hr />
  <SubjectList name="Pozostałe" :subjects="getSubjects('reszta')" />
  <hr />
  <VerseList :verses="verses" />
</template>

<script>
import SubjectList from './SubjectList.vue';
import VerseList from './VerseList.vue';
import SubjectView from './SubjectView.vue';

export default {
  components: {
    VerseList,
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
      this.verses = data.prekat['SKAŁA'].p;
    },
    getSubjects(part) {
      if (this.tematy !== null) {
        return Object.keys(this.tematy[part]);
      }
      return [];
    },
    getSubject(part, name) {
      if (this.tematy !== null) {
        return this.tematy[part][name];
      }
      return {
        hd: [], h: [], e: [], n: [],
      };
    },
  },
  async mounted() {
    await this.loadSubjects();
  },
  data() {
    return {
      verses: ['1Kor 13,8-12nn', 'Jk 2'],
      tematy: null,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
