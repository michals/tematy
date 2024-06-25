<template>
<div class="dropdown dropstart d-inline-block mx-2">
    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="people"
        data-bs-toggle="dropdown" aria-expanded="false" ref="peopleButton">
        {{ people }} <i class="bi bi-people-fill"></i>
    </button>
    <ul class="dropdown-menu" aria-labelledby="people">
        <li>
        <h6 class="dropdown-header">Osób na spotkaniu:</h6>
        </li>
        <li v-for="_, idx in Array(maxPeople)" :key="idx + 1">
        <router-link
            :to="{name:$route.name, params:{slug:slug, people:idx+1},query:{}}"
            :class="{ 'dropdown-item': true, active: people === idx + 1 }">
            {{ idx + 1 }}
            <i v-for="_, i in Array(idx+1)" :key="i" class="bi bi-person-fill"></i>
        </router-link>
        </li>
    </ul>
</div>
</template>

<script>
export default {
  name: 'PeopleDropdown',
  props: {
    slug: { type: String, requred: true },
    people: Number,
  },
  computed: {
    maxPeople() { return 8; },
  },
  methods: {
    open() {
      new window.bootstrap.Dropdown(this.$refs.peopleButton).show();
    },
  },
};
</script>
