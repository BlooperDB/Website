<template>
  <div id="googleButton"></div>
</template>

<script>
  import { ui, uiConfig } from '../../api/firebase/auth';

  export default {
    name: 'google-sso-button',
    mounted() {
      ui.start('#googleButton', uiConfig);
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../node_modules/firebaseui/dist/firebaseui.css";
</style>

