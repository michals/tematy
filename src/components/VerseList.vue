<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        :data-bs-target="`#verses-${sectionid}`" aria-expanded="false" :aria-controls="`verses-${sectionid}`">
        {{ title }} ({{ ((verses) ? verses.length : '...') }})
      </button>
    </h2>
    <div :id="`verses-${sectionid}`" class="accordion-collapse collapse" data-bs-parent="#versesAccordion">
      <div class="accordion-body">
        <ol class="verse-list">
          <li v-for="(item, index) in verses" :key="item" :class="hideVerse(index)?'visually-hidden':''">
              <VerseLink :verse="item"/>
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
    verses: Array,
    sectionid: String,
    title: String,
    persons: Number,
    person: Number,
  },
  methods: {
    hideVerse(index) {
      const person = +this.person;
      const persons = +this.persons;
      return person > 0 && ((index - person + 1) % persons) !== 0;
    },
  },
};
</script>
<style scoped></style>
