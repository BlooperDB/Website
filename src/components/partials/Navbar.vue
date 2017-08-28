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
          <router-link to="/blueprints/create" class="md-button md-icon-button">
            <md-icon>add</md-icon>
            <md-ink-ripple />
          </router-link>

          <md-menu v-if="loggedIn" md-size="4" md-direction="bottom left">
            <md-button md-menu-trigger class="md-icon-button">
              <md-icon>account_circle</md-icon>
            </md-button>

            <md-menu-content id="nav-dropdown" class="normal-dropdown">
              <router-link to="/blueprints">
                <md-menu-item>
                  <md-icon>account_circle</md-icon>
                  <span>{{ $t('navbar.menu.blueprints') }}</span>
                </md-menu-item>
              </router-link>
              <router-link to="/settings">
                <md-menu-item>
                  <md-icon>settings</md-icon>
                  <span>{{ $t('navbar.menu.settings') }}</span>
                </md-menu-item>
              </router-link>
              <md-menu-item @click.native="goSignOut">
                <md-icon>power_settings_new</md-icon>
                <span>{{ $t('navbar.menu.signOut') }}</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>

          <template v-else>
            <md-button @click.native="openLoginDialog" class="md-icon-button">
              <md-icon>account_circle</md-icon>
            </md-button>
            <login ref="loginDialog"></login>
          </template>

          <md-menu md-size="4">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>build</md-icon>
            </md-button>
            <md-menu-content class="normal-dropdown">
              <router-link to="/tools/recipes">
                <md-menu-item>
                  <md-icon>timeline</md-icon>
                  <span>{{ $t('navbar.menu.tools.recipe_tree') }}</span>
                </md-menu-item>
              </router-link>
            </md-menu-content>
          </md-menu>
        </div>
      </container>
    </nav>
    <md-snackbar md-position="top center" ref="logoutSnackbar">
      <span>You have been logged out.</span>
    </md-snackbar>
  </div>
</template>

<script>
  import Login from './Login';
  import Container from './Container';
  import NavbarSearch from './NavbarSearch';
  import { authUser, logout } from '../../api/blooper/user';
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
        const dialog = this.$refs.loginDialog;
        if (dialog && dialog.$refs.loginDialog) {
          dialog.$refs.loginDialog.open();
        }
      },
      goSignOut() {
        logout(() => {
          this.$refs.logoutSnackbar.open();
          this.$router.push('/');
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "../../assets/scss/variables";

  .normal-dropdown {
    a {
      text-decoration: none !important;

      span {
        color: black;
      }
    }
  }

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

        i {
          display: block;
        }

        &:last-child {
          margin: 0;
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
