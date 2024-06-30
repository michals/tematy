<template>
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
            <SubjectList :subjects="subjects"/>
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
            <EntryList :entries="entries"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import EntryList from '../components/EntryList.vue';
import SubjectList from '../components/SubjectList.vue';

export default {
  name: 'HomePage',
  components: {
    EntryList,
    SubjectList,
  },
  props: {
    json: { type: Object, requred: true },
  },
  computed: {
    subjects() {
      return this.json ? this.json.subjects : [];
    },
    entries() {
      return this.json ? this.json.entries : [];
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
