<template>
  <div class="card my-3">
    <div class="card-body">
      <h5 class="card-title clearfix">
        <span class="float-start">{{ title }}</span>
        <span class="float-end">
          <select class=" dropdown-toggle" @change="changePerson">
            <option v-for="(option, idx) in options()" :key="idx" :selected="selectedPerson === idx" :value="idx">{{
              option }}</option>
          </select>
        </span>
      </h5>

      <div class="accordion" id="versesAccordion">
        <VerseList :persons="persons" :person="selectedPerson" :verses="subject.hd" sectionid="hd" :selected="true"
          title="Historyczne" />
        <VerseList :persons="persons" :person="selectedPerson" :verses="subject.p" sectionid="p" title="Prorockie" />
        <VerseList :persons="persons" :person="selectedPerson" :verses="subject.n" sectionid="n"
          title="Pozaewangeliczne" />
        <VerseList :persons="persons" :person="selectedPerson" :verses="subject.e" sectionid="e" title="Ewangelie" />
      </div>
    </div>
  </div>
</template>

<script>
import VerseList from './VerseList.vue';

export default {
  name: 'SubjectView',
  components: {
    VerseList,
  },
  props: {
    subject: Object,
    title: String,
    persons: Number,
    person: Number,
  },
  data() {
    return {
      selectedPerson: +(this.person),
    };
  },
  methods: {
    changePerson(event) {
      this.selectedPerson = +event.target.value;
    },
    options() {
      return [
        'Wszyscy',
        'Osoba 1',
        'Osoba 2',
        'Osoba 3',
        'Osoba 4',
        'Osoba 5',
        'Osoba 6',
        'Osoba 7',
        'Osoba 8',
      ].slice(0, this.persons + 1);
    },
  },
};
</script>
<style scoped>
ul.verse-list {
  display: block;
}
</style>
