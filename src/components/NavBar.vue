<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="logo.png"
      alt="" width="30" class="d-inline-block align-text-top">
      Tematy Liturgii Słowa
    </a>
    <ul class="navbar-nav ms-auto">
      <li class="nav-item dropdown">
        <select class="nav-link dropdown-toggle">
          <option value="1">1 Osoba</option>
          <option value="2">2 Osoby</option>
          <option value="3">3 Osoby</option>
          <option value="4">4 Osoby</option>
          <option value="5" selected>5 Osób</option>
          <option value="6">6 Osób</option>
          <option value="7">7 Osób</option>
          <option value="8">8 Osób</option>
        </select>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>

export default {
  name: 'NavBar',
  components: {
  },
  props: {
    subject: Object,
  },
};
</script>
<style scoped>
</style>
