<template>
  <modal ref="modal">
    <div slot="header">
      <span v-if="loggedIn">Welcome, {{user.getBasicProfile().getGivenName()}}!</span>
      <span v-else>Login with Google</span>
    </div>
    <div slot="body">
      <div id="google-button">
        Loading... please wait!
      </div>
    </div>
  </modal>
</template>

<script>
  import Modal from './Modal';

  export default {
    name: 'login-popup',
    components: { Modal },
    data() {
      return {
        loggedIn: false,
        user: null,
        show() {
          this.$refs.modal.show();
        },
        hide() {
          this.$refs.modal.hide();
        },
        login() {
          const auth = window.gapi.auth2.getAuthInstance();
          if (auth !== null) {
            auth.signIn();
          }
        },
        logout() {
          const auth = window.gapi.auth2.getAuthInstance();
          if (auth !== null) {
            auth.signOut();
          }
        },
        onStatusChange(loggedIn) {
          this.loggedIn = loggedIn;
        },
        onUserChange(user) {
          this.user = user;
        }
      };
    },
    mounted() {
      const vueThis = this;

      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '434311178684-mfgopcabm17e6vdk4c3fih0moblcl0kr.apps.googleusercontent.com'
        }).then((auth) => {
          vueThis.loggedIn = auth.isSignedIn.get();
          vueThis.user = auth.currentUser.get();

          auth.isSignedIn.listen(vueThis.onStatusChange.bind(vueThis));
          auth.currentUser.listen(vueThis.onUserChange.bind(vueThis));

          window.gapi.load('signin2', () => {
            window.gapi.signin2.render('google-button', {
              scope: 'profile email',
              width: 240,
              height: 50,
              longtitle: true,
              theme: 'light'
            });
          });
        });
      });
    }
  };
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
