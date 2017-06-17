<template>
  <div id="app">
    <navbar></navbar>
    <main>
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
  import Navbar from './components/partials/Navbar';

  export default {
    name: 'app',
    components: {
      Navbar
    }
  };
</script>

<style lang="scss">
  @import "assets/scss/main";

  #app {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #333;
    position: relative;
  }

  .page-enter-active, .page-leave-active {
    transition: opacity .3s ease, transform .3s ease;
  }

  .page-enter, .page-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
</style>
