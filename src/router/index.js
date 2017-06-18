import Vue from 'vue';
import Router from 'vue-router';

/* eslint-disable global-require */
const Index = resolve => require(['../components/views/Index'], resolve);
const Search = resolve => require(['../components/views/Search'], resolve);
const Upload = resolve => require(['../components/views/Upload'], resolve);
const View = resolve => require(['../components/views/View'], resolve);

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/search/:query?',
      name: 'search',
      component: Search,
      props: true
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/view/:id',
      name: 'view',
      component: View
    }

  ]
});
