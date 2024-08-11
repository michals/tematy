<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand left">
        <img src="logo.png" alt="" width="30" class="d-inline-block align-text-top">
        Tematy Liturgii Słowa
      </router-link>
      <router-link to="/info" class="d-inline-block left btn">
        <i class="bi bi-info-circle"></i>
      </router-link>
      <div class="dropdown dropstart d-inline-block ms-auto">
        <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="cfg" data-bs-toggle="dropdown"
          aria-expanded="false">
          <i class="bi bi-gear"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="cfg">
          <li>
            <h6 class="dropdown-header">Konfiguracje:</h6>
          </li>
          <li v-for="item of configs()" :key="item.url">
            <a :href="item.url" class="dropdown-item">{{ item.text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'NavBar',
  props: {
    json: { type: Object, requred: true },
    location: { requred: true },
  },
  methods: {
    configs() {
      return [
        { db: 'ddh-lim77-overlap', text: 'DdH, sklejane, bez ogromnych' },
        { db: 'ddh-nolim-overlap', text: 'DdH, sklejane, wszystkie' },
        { db: 'ddh-lim77-nomerge', text: 'DdH, oryginalne, bez ogromnych' },
        { db: 'ddh-nolim-nomerge', text: 'DdH, oryginalne, wszystkie' },
        { db: 'ddh-lim77-chapter', text: 'DdH, grupowane, bez ogromnych' },
        { db: 'ddh-nolim-chapter', text: 'DdH, grupowane, wszystkie' },
        { db: 'ddp-lim77-overlap', text: 'DdP, sklejane, bez ogromnych' },
        { db: 'ddp-nolim-overlap', text: 'DdP, sklejane, wszystkie' },
        { db: 'ddp-lim77-nomerge', text: 'DdP, oryginalne, bez ogromnych' },
        { db: 'ddp-nolim-nomerge', text: 'DdP, oryginalne, wszystkie' },
        { db: 'ddp-lim77-chapter', text: 'DdP, grupowane, bez ogromnych' },
        { db: 'ddp-nolim-chapter', text: 'DdP, grupowane, wszystkie' },
      ].map((item) => {
        const url = new URL(window.location);
        url.searchParams.set('use', item.db);
        return { url: url.toString(), text: item.text };
      });
    },
  },
};
</script>
<style scoped></style>
