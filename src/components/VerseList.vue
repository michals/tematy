<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button :class="`accordion-button ${selected ? '' : 'collapsed'}`" type="button" data-bs-toggle="collapse"
        :data-bs-target="`#verses-${sectionId}`" aria-expanded="false" :aria-controls="`verses-${sectionId}`">
        {{ title }} ({{ titleCounters }})
      </button>
    </h2>
    <div :id="`verses-${sectionId}`" :class="`accordion-collapse collapse ${selected ? 'show' : ''}`"
      data-bs-parent="#versesAccordion">
      <div v-for="entry in entries" :key="entry" class="accordion-body">
        <div v-if="multiEntry">
          Wersety dla hasła <strong>{{ entry.title }}</strong> ({{ titleCounter(entry) }}):
        </div>
        <ol class="verse-list">
          <li v-for="(item, index) in verses(entry)" :key="item" :class="hideVerse(index) ? 'visually-hidden' : ''">
            <VerseLink :verse="item" :noicon="sectionId==='d'"/>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import VerseLink from './VerseLink.vue';

export default {
  name: 'VerseList',
  components: {
    VerseLink,
  },
  props: {
    entries: Array,
    sectionId: String,
    title: String,
    selected: Boolean,
    persons: Number,
    person: Number,
  },
  methods: {
    hideVerse(index) {
      const person = +this.person;
      const persons = +this.persons;
      return person > 0 && ((index - person + 1) % persons) !== 0;
    },
    verses(entry) {
      return entry.refs[this.sectionId];
    },
    countVisible(entry) {
      if (!this.persons || !this.person || !this.verses) return 0;
      return this.verses(entry).reduce((acc, el, idx) => acc + !this.hideVerse(idx), 0);
    },
    titleCounter(entry) {
      const visible = this.person ? `${this.countVisible(entry)} z ` : '';
      const total = (this.verses(entry)) ? `${this.verses(entry).length}` : '';
      return visible + total;
    },
  },
  computed: {
    titleCounters() {
      return this.entries.map(this.titleCounter).join(' oraz ');
    },
    multiEntry() {
      return this.entries && this.entries.length > 1;
    },
  },
};
</script>
<style scoped>
@media (min-width: 600px) {
  ol {
    column-count: 2;
    column-gap: 20px;
    column-fill: balance;
  }
}
@media (min-width: 1200px) {
  ol {
    column-count: 3;
    column-gap: 20px;
    column-fill: balance;
  }
}
</style>
