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
          <router-link class="navbar-link" to="/upload"><icon>add_circle</icon></router-link>
          <icon class="navbar-link" @click="$refs.loginpopup.show()">account_circle</icon>
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

    &.shadow {
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

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
        pointer-events: none;
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

      .navbar-link {
        cursor: pointer;
        color: #FFF;
        margin-right: 20px;

        &:last-child {
          margin: 0;
        }
      }
      a.navbar-link {
        text-decoration: none;

        i {
          display: block;
        }
      }
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
