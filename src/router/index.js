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
const CreateBlueprint = resolve => require(['../components/views/CreateBlueprint'], resolve);

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
      path: '/view/:blueprintId',
      name: 'view',
      component: View,
      props: true
    },
    {
      path: '/view/:blueprintId/revision/:revisionId',
      name: 'view-revision',
      component: View,
      props: true
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
      component: CreateBlueprint,
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
    // If user is already logged in, redirect them
    if (store.getters.user) {
      // If a redirect location is set, redirect them there
      if (from.query.redirect) {
        next({
          path: from.query.redirect
        });
        return;
      }

      // Otherwise, redirect them home
      next({
        path: '/'
      });
      return;
    }
  }
  next();
});

export default router;
