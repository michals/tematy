import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './views/HomePage.vue';
import PartsPage from './views/PartsPage.vue';
import SubjectPage from './views/SubjectPage.vue';

// /
// /lista/prekat
// /lista/reszta
// /temat/CHLEB/osoby/3/osoba/1
// /osoby/3/temat/CHLEB/osoba/1

// <router-view :key="$route.path"></router-view>
// routes =[ {..., props: route=> ({id: parseInt(route.params.id)})} ]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/lista/:part',
      name: 'part',
      component: PartsPage,
    },
    {
      path: '/temat/:code/:persons?/:person?',
      name: 'subject',
      component: SubjectPage,
      props: (route) => ({
        persons: parseInt(route.params.persons, 10) || 5,
        code: route.params.code,
        person: parseInt(route.params.person, 10) || 0,
      }),
    },
  ],
});

createApp(App).use(router).mount('#app');
