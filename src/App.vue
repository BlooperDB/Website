<template>
  <div id="app">
    <navbar></navbar>
    <main>
      <router-view></router-view>
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

  html, body {
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: "Roboto", sans-serif;
  }

  #app {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #333;
  }
</style>
