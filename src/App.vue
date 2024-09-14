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
      const db = new URLSearchParams(window.location.search).get('use');
      const defaultSearch = '?use=hlgd';
      if (window.location.search === '') {
        window.location.search = defaultSearch;
      }
      if (db.length > 4) {
        // old db detected. Reload
        this.$gtag.event('option_selected', {
          event_category: 'old_db',
          event_label: db,
          value: 1,
        });
        if (db === 'ddh-lim77-overlap') window.location.search = '?use=hlod';
        else if (db === 'ddh-nolim-overlap') window.location.search = '?use=hnod';
        else if (db === 'ddh-lim77-nomerge') window.location.search = '?use=hlnd';
        else if (db === 'ddh-nolim-nomerge') window.location.search = '?use=hnnd';
        else if (db === 'ddh-lim77-chapter') window.location.search = '?use=hlgd';
        else if (db === 'ddh-nolim-chapter') window.location.search = '?use=hngd';
        else if (db === 'ddp-lim77-overlap') window.location.search = '?use=plod';
        else if (db === 'ddp-nolim-overlap') window.location.search = '?use=pnod';
        else if (db === 'ddp-lim77-nomerge') window.location.search = '?use=plnd';
        else if (db === 'ddp-nolim-nomerge') window.location.search = '?use=pnnd';
        else if (db === 'ddp-lim77-chapter') window.location.search = '?use=plgd';
        else if (db === 'ddp-nolim-chapter') window.location.search = '?use=pngd';
        else window.location.search = defaultSearch;
      }
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
      this.$gtag.event('option_selected', {
        event_category: 'DB',
        event_label: db,
        value: 1,
      });
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
