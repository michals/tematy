<template>
  <div class="card my-3">
    <div class="card-body">
      <h5 class="card-title clearfix">
        <span class="float-start">{{ subject.title }}</span>
        <span class="float-end">

          <div class="dropdown dropstart d-inline-block mx-2">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="persons"
              data-bs-toggle="dropdown" aria-expanded="false">
              {{ persons }} <i class="bi bi-people-fill"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="persons">
              <li>
                <h6 class="dropdown-header">Ilość osób</h6>
              </li>

              <li v-for="option, idx in personsOptions" :key="idx + 1">
                <router-link
                  :to="{name:'subject', params:{subject:subject.code, persons:idx+1}}"
                  :class="{ 'dropdown-item': true, active: persons === idx + 1 }" >{{ option
                  }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="dropdown dropstart d-inline-block">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="persons"
              data-bs-toggle="dropdown" aria-expanded="false">
              {{ person ? person : '' }}<i v-if="!person" class="bi bi-asterisk"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="persons">
              <li>
                <h6 class="dropdown-header">Pokaż dla</h6>
              </li>

              <li v-for="option, idx in personOptions" :key="idx + 1">
                <router-link
                  :to="{name:'subject', params:{subject:subject.code, persons:persons, person:idx}}"
                  :class="{ 'dropdown-item': true, active: person === idx }">
                  {{ option }}
                </router-link>
              </li>
            </ul>
          </div>

        </span>
      </h5>

      <div class="accordion" id="versesAccordion">
        <VerseList :persons="persons" :person="person" :verses="subject.hd" sectionid="hd" :selected="true"
          title="Historyczne" />
        <VerseList :persons="persons" :person="person" :verses="subject.p" sectionid="p" title="Prorockie" />
        <VerseList :persons="persons" :person="person" :verses="subject.n" sectionid="n" title="Pozaewangeliczne" />
        <VerseList :persons="persons" :person="person" :verses="subject.e" sectionid="e" title="Ewangelie" />
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
    persons: Number,
    person: Number,
  },
  computed: {
    personsOptions() {
      return [
        '1 Osoba',
        '2 Osoby',
        '3 Osoby',
        '4 Osoby',
        '5 Osób',
        '6 Osób',
        '7 Osób',
        '8 Osób',
      ];
    },
    personOptions() {
      return [
        'Wszystkich',
        'Osoby 1',
        'Osoby 2',
        'Osoby 3',
        'Osoby 4',
        'Osoby 5',
        'Osoby 6',
        'Osoby 7',
        'Osoby 8',
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
