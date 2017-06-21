<template>
  <md-dialog ref="loginDialog" @open="setLoginDialogOpen(true)">
    <md-dialog-title>{{ $t('navbar.login.header') }}</md-dialog-title>

    <md-dialog-content>
      <google-sso-button v-if="loginDialogOpen" ref="loginButton"></google-sso-button>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
  import GoogleSsoButton from './GoogleSsoButton';

  export default {
    name: 'login',
    components: {
      GoogleSsoButton
    },
    data() {
      return {
        loginDialogOpen: false
      };
    },
    methods: {
      setLoginDialogOpen(loginDialogOpen) {
        this.loginDialogOpen = loginDialogOpen;
        requestAnimationFrame(() => {
          const button = this.$refs.loginButton;
          const textSpan = button && button.$el.querySelector('.firebaseui-idp-text-long');
          if (textSpan) {
            textSpan.innerHTML = this.$t('navbar.login.button');
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
