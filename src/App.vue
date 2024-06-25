<template>
  <nav-bar :json="json"/>
  <div class="container">
    <router-view :json="json"/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      json: null,
    };
  },
  methods: {
    async loadJSON() {
      const response = await fetch('subjects-ddhp-lim77-merged.json');
      this.json = await response.json();
      console.log(this.json);
    },
  },
  async mounted() {
    await this.loadJSON();
  },
};
</script>

<style>
</style>
