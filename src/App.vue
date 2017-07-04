<template>
  <div id="app">
    <navbar ref="nav"></navbar>
    <main>
      <transition name="page" mode="out-in">
        <router-view class="router-view"></router-view>
      </transition>
    </main>
    <footer>
      <global-footer></global-footer>
    </footer>
  </div>
</template>

<script>
  import GlobalFooter from './components/partials/GlobalFooter';
  import Navbar from './components/partials/Navbar';

  export default {
    name: 'app',
    components: {
      GlobalFooter,
      Navbar
    }
  };
</script>

<style lang="scss">
  @import "../node_modules/vue-material/dist/vue-material.css";
  @import "assets/scss/main";

  #app {
    height: 100%;
    min-height: 100vh;
    background-color: #3a3a3a;
    position: relative;
    display: flex;
    flex-direction: column;
    color: #FFF;
  }

  main {
    flex: 1;
    display: flex;
  }

  .router-view {
    flex: 1;
  }

  .page-enter-active, .page-leave-active {
    transition: opacity .3s ease, transform .3s ease;
  }

  .page-enter, .page-leave-to {
    opacity: 0;
    transform: scale(1.01);
  }
</style>
