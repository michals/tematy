<template>
  <div class="card my-3">
    <div class="card-body">
      <h5 class="card-title clearfix">
        <span class="float-start">Temat: <strong>{{ entry.title }}</strong></span>
        <span class="float-end">
          <person-dropdown :slug="slug" :people="people" :person="person" ref="personComponent" />
          <span>&nbsp;z</span>
          <people-dropdown :slug="slug" :people="people" ref="peopleComponent"/>
        </span>
      </h5>

      <div class="accordion" id="versesAccordion">
        <VerseList v-if="entry.refs.HD" :persons="people" :person="person" :selected="true"
        :entries="[entry]" sectionId="HD" title="Historyczne + Dydaktyczne" />
        <VerseList v-if="entry.refs.H" :persons="people" :person="person" :selected="true"
        :entries="[entry]" sectionId="H" title="Historyczne" />

        <VerseList v-if="entry.refs.PD" :persons="people" :person="person"
        :entries="[entry]" sectionId="PD" title="Prorockie + Dydaktyczne" />
        <VerseList v-if="entry.refs.P" :persons="people" :person="person"
        :entries="[entry]" sectionId="P" title="Prorockie" />

        <VerseList :persons="people" :person="person"
        :entries="[entry]" sectionId="N" title="Pozaewangeliczne" />

        <VerseList :persons="people" :person="person"
        :entries="[entry]" sectionId="G" title="Ewangelie" />

        <VerseList :persons="people" :person="0"
        :entries="[entry]" sectionId="d" title="Psalmy (pomocne przy doborze pieśni)" />
      </div>
    </div>
  </div>

</template>

<script>
import VerseList from '../components/VerseList.vue';
import PeopleDropdown from '../components/PeopleDropdown.vue';
import PersonDropdown from '../components/PersonDropdown.vue';

export default {
  name: 'EntryPage',
  components: {
    PeopleDropdown,
    PersonDropdown,
    VerseList,
  },
  props: {
    json: { type: Object, requred: true },
    slug: { type: String, requred: true },
    people: Number,
    person: Number,
    names: Array,
  },
  methods: {
    openDoropdowns() {
      if (!this.people) {
        console.log('people is not set');
        setTimeout(() => { this.$refs.peopleComponent.open(); }, 300);
      } else if (this.person === undefined) {
        console.log('person is not set');
        setTimeout(() => { this.$refs.personComponent.open(); }, 300);
      }
    },
  },
  computed: {
    entry() {
      if (this.json) {
        return this.json.entries.find((entry) => entry.slug === this.slug);
      }
      return { // when json not yet loaded
        title: '...',
        slug: this.slug,
        refs: {
          HD: [], P: [], N: [], G: [], d: [],
        },
      };
    },
  },
  updated() {
    console.log('entry view updated');
    this.openDoropdowns();
  },
};
</script>

<style scoped>
ul.verse-list {
  display: block;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
