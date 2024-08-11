<template>
  <nav-bar :json="json" :location="$route"/>
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
      const db = new URLSearchParams(window.location.search).get('use') || 'ddh-lim77-overlap';
      console.log('DB:', db);
      let response;
      if (window.DecompressionStream) {
        console.log('Using DecompressionStream');
        const gunzip = new window.DecompressionStream('gzip');
        const gzResponse = await fetch(`subjects-${db}.json.gz`);
        const blob = await gzResponse.blob();
        const decompressedStream = blob.stream().pipeThrough(gunzip);
        response = new window.Response(decompressedStream);
      } else {
        console.log('No support for DecompressionStream');
        response = await fetch(`subjects-${db}.json`);
      }
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
