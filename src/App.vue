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
      const db = new URLSearchParams(window.location.search).get('use') || 'ddhp-lim77-merged';
      console.log('DB:', db);
      const response = await fetch(`subjects-${db}.json`);
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
