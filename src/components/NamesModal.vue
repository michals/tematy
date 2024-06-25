<template>
<div class="modal fade" id="namesModal" tabindex="-1" aria-labelledby="namesModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="namesModalLabel">Podaj imiona</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="namesChanged">
          <div class="input-group mb-1" v-for="(name, idx) in names()" :key="idx">
            <span class="input-group-text">{{ idx + 1 }}</span>
            <input
             type="text"
             class="form-control"
             :value="name"
             @input="setName(idx, $event.target.value)"
             >
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'NamesModal',
  props: {
    people: { type: Number, required: true },
    initialNames: Array,
  },
  emits: ['namesChanged'],
  methods: {
    nameKey(idx) {
      // localStorage key name for the name @ index
      return `name${idx + 1}`;
    },
    setName(idx, name) {
      localStorage[this.nameKey(idx)] = name;
    },
    getName(idx) {
      return localStorage[this.nameKey(idx)];
    },
    names() {
      return Array(this.people).fill(null).map(
        (_, idx) => this.getName(idx),
      );
    },
    reset() {
      Array(this.people).map(
        (_, idx) => this.setName(idx, this.defaultName),
      );
    },
    namesChanged() {
      console.log('Names emited:', this.names());
      this.$emit('namesChanged', this.names());
    },
  },
  computed: {
    defaultName() { return 'Osoba'; },
  },
  updated() {
    console.log('NamesMoal update');
    // The localStorage[name{idx}] is the source-of-truth.
    Array(this.people).fill(0).forEach((_, idx) => {
      // If names not set there, initialise with default names
      if (!this.getName(idx)) this.setName(idx, this.defaultName);
    });
    // Then override valus by initialNames prop if provided
    if (this.initialNames) {
      this.initialNames.forEach((name, idx) => {
        this.setName(idx, name);
      });
    }
  },
};
</script>
