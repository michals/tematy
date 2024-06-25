<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="logo.png" alt="" width="30" class="d-inline-block align-text-top">
        Tematy Liturgii Słowa
      </router-link>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'NavBar',
  props: {
    json: { type: Object, requred: true },
  },
};
</script>
<style scoped></style>
