<template>
  <modal ref="modal">
    <div slot="header">
      <span v-if="loggedIn">Welcome, {{user.getBasicProfile().getGivenName()}}!</span>
      <span v-else>Login with Google</span>
    </div>
    <div slot="body">
      <google-sso-button></google-sso-button>
    </div>
  </modal>
</template>

<script>
  import GoogleSsoButton from './GoogleSsoButton';
  import Modal from './Modal';

  export default {
    name: 'login-popup',
    components: {
      GoogleSsoButton,
      Modal
    },
    data() {
      return {
        loggedIn: false,
        user: null,
        show() {
          this.$refs.modal.show();
        },
        hide() {
          this.$refs.modal.hide();
        }
      };
    }
  };
</script>
