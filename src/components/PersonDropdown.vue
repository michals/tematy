<template>
<div class="dropdown dropstart d-inline-block">
    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="person"
        data-bs-toggle="dropdown" aria-expanded="false" ref="personButton">
        <i v-if="!person" class="bi bi-asterisk"></i>
        <span v-if="person" >{{ person }}<i class="bi bi-person-fill"></i></span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="person">
        <li><h6 class="dropdown-header">Pokaż wersety dla:</h6></li>

        <li v-for="option, idx in personOptions" :key="idx">
            <router-link
                :to="{name:$route.name, params:{slug:slug, people:people, person:idx},query:{}}"
                :class="{ 'dropdown-item': true, active: person === idx }">
                {{ option }}
            </router-link>
        </li>
        <!--
        <li><hr class="dropdown-divider"></li>
        <li>
            <a href="" class="dropdown-item" data-bs-toggle="modal"
            data-bs-target="#namesModal">Ustaw imiona</a>
        </li>
        -->
    </ul>
</div>
</template>

<script>

export default {
  name: 'PersonDropdown',
  props: {
    slug: { type: String, requred: true },
    people: { type: Number, requred: true },
    person: Number,
  },
  methods: {
    open() {
      new window.bootstrap.Dropdown(this.$refs.personButton).show();
    },
  },
  computed: {
    personOptions() {
      const names = Array(8).fill('Osoba'); // TODO: get from config
      return ['Wszystkich']
        .concat(
          names.map((val, idx) => `${idx + 1}. ${val}`),
        )
        .slice(0, this.people + 1);
    },
  },
};
</script>
