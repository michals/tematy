<template>
  <nav-bar />
  <div class="container">
    <HomePage />
</div>
</template>

<script>
import HomePage from './components/HomePage.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    NavBar,
  },
};
</script>

<style>
.icon-red {
  color: red;
}

.icon-green {
  color: green;
}

.icon-blue {
  color: blue;
}
.icon-gray {
  color: gray;
}
</style>
