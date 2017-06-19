<template>
  <div class="footer">
    <div class="footer-bottom">
      <container class="footer-bottom-inner">
        <div class="footer-part footer-left">
          <select v-model="selectedLanguage">
            <option v-for="(language, index) in languages" :value="index">{{ language }}</option>
          </select>
        </div>
        <div class="footer-part footer-right">
          &copy; Blooper 2017. {{ $t('footer.copyright') }}
        </div>
      </container>
    </div>
  </div>
</template>

<script>
  import Container from './Container';
  import changeLanguage from '../../i18n';
  import languages from '../../i18n/languages.json';

  export default {
    components: { Container },
    name: 'footer',
    data() {
      return {
        selectedLanguage: 'en-US'
      };
    },
    computed: {
      languages() {
        return languages;
      },
      storedLanguage() {
        return this.$i18n.locale();
      }
    },
    watch: {
      selectedLanguage(newSelectedLanguage) {
        changeLanguage(newSelectedLanguage);
      },
      storedLanguage(newStoredLanguage) {
        if (newStoredLanguage != null) {
          this.selectedLanguage = newStoredLanguage;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .footer {
    background-color: #222;
  }

  .footer-bottom {
    padding: 15px 0;

    .footer-bottom-inner {
      display: flex;
    }
  }

  .footer-part {
    flex: 1;
  }

  .footer-right {
    text-align: right;
  }
</style>
