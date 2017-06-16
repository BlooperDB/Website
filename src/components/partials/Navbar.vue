<template>
  <div>
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
        <navbar-search></navbar-search>
        <div class="navbar-links">
          <div @click="$refs.loginpopup.show()"><icon>account_circle</icon></div>
        </div>
      </container>
    </nav>
    <keep-alive>
      <login-popup ref="loginpopup"></login-popup>
    </keep-alive>
  </div>
</template>

<script>
  import Container from './Container';
  import Icon from './Icon';
  import LoginPopup from './LoginPopup';
  import NavbarSearch from './NavbarSearch';

  export default {
    name: 'navbar',
    components: {
      Container,
      Icon,
      NavbarSearch,
      LoginPopup
    }
  };
</script>

<style lang="scss">
  @import "../../assets/scss/variables";

  .navbar {
    background: linear-gradient(to right, #357aff, #57bfff);
    height: 80px;
    width: 100%;
    position: relative;

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
      }

      .text-block {
        font-size: 2em;
        font-weight: 100;
        color: #FFF;
        margin-left: 10px;

        @media (max-width: 768px) {
          display: none;
        }
      }

      &:hover .logo-block img {
        animation: rotate 3s infinite;
        backface-visibility: hidden;
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
