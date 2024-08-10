<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="logo.png" alt="" width="30" class="d-inline-block align-text-top">
        Tematy Liturgii Słowa
      </router-link>
    </div>
    <div class="dropdown dropstart d-inline-block me-2">
    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="cfg"
        data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-gear"></i>
    </button>
    <ul class="dropdown-menu" aria-labelledby="cfg">
        <li>
          <h6 class="dropdown-header">Konfiguracje:</h6>
        </li>
        <li v-for="item of configs()" :key="item.url">
          <a :href="item.url" class="dropdown-item" >{{item.text}}</a>
        </li>

    </ul>
</div>

</nav>
</template>

<script>

export default {
  name: 'NavBar',
  props: {
    json: { type: Object, requred: true },
    location: { type: String, requred: true },
  },
  methods: {
    configs() {
      console.log('XXX', this.location);
      return [
        { db: 'ddhp-lim77-merged', text: 'DDH, bez ogromnych, grupowane' },
        { db: 'ddhp-nolim-merged', text: 'DDH, wszystkie, grupowane' },
        { db: 'ddhp-lim77-nomerge', text: 'DDH, bez ogromnych, osobno' },
        { db: 'ddhp-nolim-nomerge', text: 'DDH, wszystkie, osobno' },
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
