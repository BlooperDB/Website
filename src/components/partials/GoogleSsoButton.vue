<template>
  <div id="google-button"></div>
</template>

<script>
  export default {
    name: 'google-sso-button',
    mounted() {
      window.gapi.signin2.render('google-button', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'light'
      });
    }
  };
</script>

