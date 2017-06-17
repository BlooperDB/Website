<template>
  <div id="google-button"></div>
</template>

<script>
  export default {
    name: 'google-sso-button',
    data() {
      return {
        loggedIn: false,
        user: null,
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
          console.log(user);
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

