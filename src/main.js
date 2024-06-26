import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './views/HomePage.vue';
import EntryPage from './views/EntryPage.vue';
import SubjectPage from './views/SubjectPage.vue';

function integerIfPresent(name, value) {
  if (!value) return {};
  return { [name]: parseInt(value, 10) };
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/haslo/:slug/:people?/:person?',
      name: 'entry',
      component: EntryPage,
      props: (route) => ({
        slug: route.params.slug || '',
        ...integerIfPresent('people', route.params.people),
        ...integerIfPresent('person', route.params.person),
      }),
    },
    {
      path: '/temat/:slug/:people?/:person?',
      name: 'subject',
      component: SubjectPage,
      props: (route) => ({
        slug: route.params.slug || '',
        ...integerIfPresent('people', route.params.people),
        ...integerIfPresent('person', route.params.person),
      }),
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log('Global Before Each: Navigating from', from.fullPath, 'to', to.fullPath);
  next();
});

router.afterEach((to, from) => {
  console.log('Global After Each: Navigated from', from.fullPath, 'to', to.fullPath);
});

createApp(App).use(router).mount('#app');
