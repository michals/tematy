<template>
  <nav-bar @home="home" @personsChanged="personsChanged"/>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
// import HomePage from './views/HomePage.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    // HomePage,
    NavBar,
  },
  methods: {
    home() {
      this.$refs.home.clear();
    },
    personsChanged(persons) {
      console.log(persons, this.$route, this.$router);
      const { params } = this.$route;
      params.persons = persons;
      console.log('push params: ', params);
      this.$router.push({ name: this.$route.name, params });
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
