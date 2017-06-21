<template>
  <div id="googleButton"></div>
</template>

<script>
  import { ui, uiConfig } from '../../api/firebase/auth';

  export default {
    name: 'google-sso-button',
    mounted() {
      ui.start('#googleButton', uiConfig);

      this.localize(true);
    },
    methods: {
      localize(retry) {
        requestAnimationFrame(() => {
          const textSpan = this.$el.querySelector('.firebaseui-idp-text-long');
          if (textSpan) {
            textSpan.innerHTML = this.$t('navbar.login.button');
          } else if (retry) {
            setTimeout(this.localize, 100);
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
        this.localize(true);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../node_modules/firebaseui/dist/firebaseui.css";
</style>

