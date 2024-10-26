import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import VueGtag from 'vue-gtag';
import App from './App.vue';
import HomePage from './views/HomePage.vue';
import InfoPage from './views/InfoPage.vue';
import TextPage from './views/TextPage.vue';
import EntryPage from './views/EntryPage.vue';
import SubjectPage from './views/SubjectPage.vue';
import './registerServiceWorker';

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
      path: '/info',
      name: 'info',
      component: InfoPage,
    },
    {
      path: '/tekst/:slug',
      name: 'tekst',
      component: TextPage,
      props: (route) => ({
        slug: route.params.slug || '',
      }),
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

const app = createApp(App);

// Suppress production tip message
app.config.productionTip = false;

app.use(router);
app.use(VueGtag, {
  config: { id: 'G-MCBJLFP84W' },
}, router);

app.mount('#app');
