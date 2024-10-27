<template>
  <div v-if="json" class="card my-3">
    <div class="card-body">
      <h5 class="card-title clearfix">
        <span class="float-start"><strong>{{ subject.t }}</strong></span>
        <span class="float-start">
          <router-link
          v-for="entry in subject.e" :key="entry"
          :to="{ name: 'tekst', params: { slug: entry } }">
            <i class="ms-2 bi bi-book"/></router-link>
        </span>
        <span class="float-end">
          <person-dropdown :slug="slug" :people="people" :person="person" ref="personComponent" />
          <span>&nbsp;z</span>
          <people-dropdown :slug="slug" :people="people" ref="peopleComponent"/>
        </span>
      </h5>

      <div class="accordion" id="versesAccordion">
        <VerseList v-if="entries[0].refs.HD" :persons="people" :person="person" :selected="true"
        :entries="entries" sectionId="HD" title="Historyczne + Dydaktyczne" />
        <VerseList v-if="entries[0].refs.H" :persons="people" :person="person" :selected="true"
        :entries="entries" sectionId="H" title="Historyczne" />

        <VerseList v-if="entries[0].refs.PD" :persons="people" :person="person"
        :entries="entries" sectionId="PD" title="Prorockie + Dydaktyczne" />
        <VerseList v-if="entries[0].refs.P" :persons="people" :person="person"
        :entries="entries" sectionId="P" title="Prorockie" />

        <VerseList :persons="people" :person="person"
        :entries="entries" sectionId="N" title="Pozaewangeliczne" />

        <VerseList :persons="people" :person="person"
        :entries="entries" sectionId="G" title="Ewangelie" />

        <VerseList v-if="entries[0].refs.d" :persons="people" :person="0"
        :entries="entries" sectionId="d" title="Psalmy"
        note="Odniesienia do Psalmów. Pomocne przy doborze pieśni." />
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
    getEntry(entrySlug) {
      if (this.json) {
        return this.json.entries.find((entry) => entry.slug === entrySlug);
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
  computed: {
    subject() {
      if (this.json) {
        console.log('slug=', this.slug);
        const found = this.json.subjects.find((subject) => subject.s === this.slug);
        console.log('found=', found);
        return found;
      }
      console.log('no json');
      return { // when json not yet loaded
        t: '...',
        s: this.slug,
        e: [],
      };
    },
    entries() {
      return this.subject.e.map((slug) => this.getEntry(slug));
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
