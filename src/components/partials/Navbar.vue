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
          <router-link to="/add" class="md-button md-icon-button">
            <md-icon>add</md-icon>
            <md-ink-ripple />
          </router-link>
          <md-menu v-if="loggedIn" md-direction="bottom left">
            <md-button md-menu-trigger class="md-icon-button">
              <md-icon>account_circle</md-icon>
            </md-button>

            <md-menu-content>
              <md-menu-item>My Item 1</md-menu-item>
              <md-menu-item>My Item 2</md-menu-item>
              <md-menu-item @click.native="signOut">Sign Out</md-menu-item>
            </md-menu-content>
          </md-menu>
          <template v-else>
            <md-button @click.native="openLoginDialog()" class="md-icon-button">
              <md-icon>account_circle</md-icon>
            </md-button>
            <login ref="loginDialog"></login>
          </template>
        </div>
      </container>
    </nav>
    <md-snackbar md-position="top center" ref="logoutSnackbar">
      <span>You have been logged out.</span>
    </md-snackbar>
  </div>
</template>

<script>
  import Container from './Container';
  import Login from './Login';
  import NavbarSearch from './NavbarSearch';
  import { authUser, logout } from '../../api/blooper/auth';
  import { addAuthListener } from '../../api/firebase/auth';

  export default {
    name: 'navbar',
    components: {
      Container,
      Login,
      NavbarSearch
    },
    mounted() {
      addAuthListener((user) => {
        if (user) {
          user.getIdToken(false)
            .then((token) => {
              authUser(token);
            });
        }
      });

      // Wait for animation to complete when mouse is no longer hovered

      const brand = document.querySelector('.navbar-brand');
      const logo = document.querySelector('.logo-block img');

      let hovered = false;

      brand.addEventListener('mouseover', () => {
        logo.classList.add('animated');
        hovered = true;
      });

      brand.addEventListener('mouseleave', () => {
        hovered = false;
      });

      logo.addEventListener('animationiteration', () => {
        if (!hovered) {
          logo.classList.remove('animated');
        }
      });
    },
    computed: {
      loggedIn() {
        return this.$store.getters.user != null;
      }
    },
    methods: {
      openLoginDialog() {
        this.$refs.loginDialog.$refs.loginDialog.open();
      },
      signOut() {
        logout();
        this.$refs.logoutSnackbar.open();
      }
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
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }

    .navbar-inner {
      display: flex;
      height: 100%;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none !important;

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

      img.animated {
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
      .navbar-link {
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
