import Vue from 'vue';
import Router from 'vue-router';

/* eslint-disable global-require */
const Index = resolve => require(['../components/views/Index'], resolve);
const Add = resolve => require(['../components/views/Add'], resolve);
const Search = resolve => require(['../components/views/Search'], resolve);
const View = resolve => require(['../components/views/View'], resolve);

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
      meta: { auth: true }
    },
    {
      path: '/search/:query?',
      name: 'search',
      component: Search,
      props: true
    },
    {
      path: '/view/:id',
      name: 'view',
      component: View
    }

  ]
});

export default router;
