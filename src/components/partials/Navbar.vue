<template>
  <nav class="navbar">
    <container class="navbar-inner">
      <router-link to="/" class="navbar-brand">
        <div class="logo-block">
          <img src="../../assets/img/logo.svg">
        </div>
        <div class="text-block">
          Blooper
        </div>
      </router-link>
      <div class="navbar-search">
        <div class="navbar-search-inner">
          <icon class="search-icon">search</icon>
          <text-input class="search-input" type="text" placeholder="Search blueprints..."></text-input>
        </div>
      </div>
      <div class="navbar-links">
        <icon>account_circle</icon>
      </div>
    </container>
  </nav>
</template>

<script>
  import Container from './Container';
  import TextInput from './TextInput';
  import Icon from './Icon';

  export default {
    name: 'navbar',
    components: {
      Container,
      TextInput,
      Icon
    }
  };
</script>

<style lang="scss">
  @import "../../assets/scss/variables";

  .navbar {
    background: linear-gradient(to right, #357aff, #57bfff);
    height: 80px;
    width: 100%;

    .navbar-inner {
      display: flex;
      height: 100%;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      .logo-block {
        flex: 1;
        width: 40px;
        margin-right: 10px;
      }

      .text-block {
        font-size: 2em;
        font-weight: 100;
        color: #FFF;
      }

      &:hover .logo-block img {
        animation: rotate 3s infinite;
        backface-visibility: hidden;
      }
    }

    .navbar-search {
      flex: 1;
      display: flex;
      align-items: center;
      margin: 0 30px;

      .navbar-search-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparentize(#333, 0.9);
        flex: 1;
        padding-left: 15px;
        border-radius: 5px;
      }

      .search-input {
        flex: 1;

        input {
          font-size: 1.2em;
          border-bottom: none !important;
          padding: 10px 15px !important;
        }
      }
      .search-icon {
        color: #FFF;
      }
    }

    .navbar-links {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFF;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg) translateZ(0) scale(1.0, 1.0);
    }
    100% {
      transform: rotate(360deg) translateZ(0) scale(1.0, 1.0);
    }
  }
</style>
