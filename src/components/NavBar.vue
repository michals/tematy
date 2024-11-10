<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand left">
        <img src="img/icons/logo.svg" alt="" width="30" class="d-inline-block align-text-top">
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
          <li class="dropdown-item" @click="darkMode()">Odwróć kolory</li>
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
    darkMode() {
      document.querySelector('html').classList.toggle('dark-mode');
    },
    configs() {
      return [
        { db: 'hlod', text: 'DdH, scalanie, bez ogromnych' },
        { db: 'hnod', text: 'DdH, scalanie, wszystkie' },
        { db: 'hlnd', text: 'DdH, oryginalne, bez ogromnych' },
        { db: 'hnnd', text: 'DdH, oryginalne, wszystkie' },
        { db: 'hlgd', text: 'DdH, grupowane, bez ogromnych' },
        { db: 'hngd', text: 'DdH, grupowane, wszystkie' },
        { db: 'plod', text: 'DdP, scalanie, bez ogromnych' },
        { db: 'pnod', text: 'DdP, scalanie, wszystkie' },
        { db: 'plnd', text: 'DdP, oryginalne, bez ogromnych' },
        { db: 'pnnd', text: 'DdP, oryginalne, wszystkie' },
        { db: 'plgd', text: 'DdP, grupowane, bez ogromnych' },
        { db: 'pngd', text: 'DdP, grupowane, wszystkie' },
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
