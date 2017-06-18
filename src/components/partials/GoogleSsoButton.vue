<template>
  <div id="googleButton"></div>
</template>

<script>
  export default {
    name: 'google-sso-button',
    mounted() {
      window.gapi.signin2.render('googleButton', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark'
      });
    }
  };
</script>

<style lang="scss" scoped>
  #googleButton {
    display: inline-block;
  }
</style>

