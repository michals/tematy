<template>
  <div v-if="subject && subject.part && subject.code">
    <SubjectView :subject="getSubject(subject.part, subject.code)" :persons="persons" :person=0 />
  </div>
  <div v-else>
    <div class="accordion my-3" id="parts">

      <div class="accordion-item">
        <h2 class="accordion-header" id="prekatHead">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#prekat"
            aria-expanded="true" aria-controls="prekat">
            Lista tematów dla prekatechumentu
          </button>
        </h2>
        <div id="prekat" class="accordion-collapse collapse show" aria-labelledby="prekatHead" data-bs-parent="#parts">
          <div class="accordion-body">
            <SubjectList part="prekat" :subjects="getSubjects('prekat')" :codes="getCodes('prekat')"
              @change-subject="changeSubject" name="Prekatechument" />
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="resztaHead">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#reszta"
            aria-expanded="true" aria-controls="reszta">
            Lista pozostałych tematów
          </button>
        </h2>
        <div id="reszta" class="accordion-collapse collapse" aria-labelledby="resztaHead" data-bs-parent="#parts">
          <div class="accordion-body">
            <SubjectList part="reszta" :subjects="getSubjects('reszta')" :codes="getCodes('reszta')"
              @change-subject="changeSubject" name="Prekatechument" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SubjectList from '../components/SubjectList.vue';
import SubjectView from '../components/SubjectView.vue';

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

<style scoped></style>
