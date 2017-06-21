import Vue from 'vue';
import Router from 'vue-router';

/* eslint-disable global-require */
const Index = resolve => require(['../components/views/Index'], resolve);
const Create = resolve => require(['../components/views/Create'], resolve);
const Search = resolve => require(['../components/views/Search'], resolve);
const View = resolve => require(['../components/views/View'], resolve);
const MyBlueprints = resolve => require(['../components/views/MyBlueprints'], resolve);
const Settings = resolve => require(['../components/views/Settings'], resolve);

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
      path: '/view/:id',
      name: 'view',
      component: View
    },
    {
      path: '/search/:query?',
      name: 'search',
      component: Search,
      props: true
    },
    {
      path: '/blueprints',
      name: 'blueprints',
      component: MyBlueprints,
      meta: { auth: true }
    },
    {
      path: '/blueprints/create',
      name: 'blueprints-create',
      component: Create,
      meta: { auth: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: { auth: true }
    }

  ]
});

export default router;
