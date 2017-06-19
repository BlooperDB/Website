<template>
  <md-dialog ref="loginDialog" @open="setLoginDialogOpen(true)" @close="setLoginDialogOpen(false)">
    <md-dialog-title>{{ $t('login.headerText') }}</md-dialog-title>

    <md-dialog-content>
      <google-sso-button v-if="loginDialogOpen"></google-sso-button>
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
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
