import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

/* eslint-disable global-require */
const Index = resolve => require(['../components/views/Index'], resolve);
const Login = resolve => require(['../components/views/Login'], resolve);
const Settings = resolve => require(['../components/views/Settings'], resolve);

const Search = resolve => require(['../components/views/Search'], resolve);

const MyBlueprints = resolve => require(['../components/views/MyBlueprints'], resolve);
const View = resolve => require(['../components/views/View'], resolve);
const Create = resolve => require(['../components/views/Create'], resolve);

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
      path: '/login',
      name: 'login',
      component: Login
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return;
    }
  } else if (to.name === 'login') {
    // If user is already logged in, redirect them home
    if (store.getters.user) {
      next({
        path: '/'
      });
      return;
    }
  }
  next();
});

export default router;
