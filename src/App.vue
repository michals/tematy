<template>
  <nav-bar @home="home" @personsChanged="personsChanged"/>
  <div class="container">
    <HomePage ref="home"/>
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
  methods: {
    home() {
      this.$refs.home.clear();
    },
    personsChanged(persons) {
      this.$refs.home.persons = persons;
    },
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
