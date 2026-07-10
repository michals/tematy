<template>
  <div>
    <div v-if="alphabet.length > 0" class="letter-filter d-flex flex-wrap gap-1 justify-content-center my-3">
      <button
        v-for="letter in alphabet"
        :key="letter"
        type="button"
        class="btn btn-sm letter-btn"
        :class="selectedLetter === letter ? 'btn-primary' : 'btn-outline-secondary'"
        @click="toggleLetter(letter)"
      >
        {{ letter }}
      </button>
    </div>

    <div class="accordion my-3" id="parts">

      <div class="accordion-item">
        <h2 class="accordion-header" id="subjectHead">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#subject"
            aria-expanded="true" aria-controls="subject">
            Tematy dla prekatechumenatu
          </button>
        </h2>
        <div id="subject" class="accordion-collapse collapse show"
        aria-labelledby="subjectHead" data-bs-parent="#parts">
          <div class="accordion-body">
            <SubjectList :subjects="subjects" :selected-letter="selectedLetter"/>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="entryHead">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#entry"
            aria-expanded="true" aria-controls="entry">
            Lista wszystkich haseł
          </button>
        </h2>
        <div id="entry" class="accordion-collapse collapse" aria-labelledby="entryHead" data-bs-parent="#parts">
          <div class="accordion-body">
            <EntryList :entries="entries" :selected-letter="selectedLetter"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EntryList from '../components/EntryList.vue';
import SubjectList from '../components/SubjectList.vue';
import getBaseLetter from '../utils/letters';

export default {
  name: 'HomePage',
  components: {
    EntryList,
    SubjectList,
  },
  props: {
    json: { type: Object, required: true },
  },
  data() {
    return {
      selectedLetter: null,
    };
  },
  computed: {
    subjects() {
      return this.json ? this.json.subjects : [];
    },
    entries() {
      return this.json ? this.json.entries : [];
    },
    alphabet() {
      const letters = new Set();
      this.subjects.forEach((s) => {
        const char = getBaseLetter(s.t);
        if (char) letters.add(char);
      });
      this.entries.forEach((e) => {
        const char = getBaseLetter(e.title);
        if (char) letters.add(char);
      });
      return Array.from(letters).sort((a, b) => a.localeCompare(b));
    },
  },
  methods: {
    toggleLetter(letter) {
      if (this.selectedLetter === letter) {
        this.selectedLetter = null;
      } else {
        this.selectedLetter = letter;
      }
    },
  },
};
</script>

<style scoped>
.letter-filter {
  max-width: 600px;
  margin: 0 auto;
}
.letter-btn {
  width: 38px;
  height: 38px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 4px;
}
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
