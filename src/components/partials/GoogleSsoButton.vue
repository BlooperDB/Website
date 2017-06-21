<template>
  <div id="googleButton"></div>
</template>

<script>
  import { ui, uiConfig } from '../../api/firebase/auth';

  export default {
    name: 'google-sso-button',
    mounted() {
      ui.start('#googleButton', uiConfig);

      this.localize();
    },
    methods: {
      localize() {
        requestAnimationFrame(() => {
          const textSpan = this.$el.querySelector('.firebaseui-idp-text-long');
          if (textSpan) {
            textSpan.innerHTML = this.$t('navbar.login.button');
          }
        });
      }
    },
    computed: {
      buttonText() {
        return this.$t('navbar.login.button');
      }
    },
    watch: {
      buttonText() {
        this.localize();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../node_modules/firebaseui/dist/firebaseui.css";
</style>

