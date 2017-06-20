<template>
  <div class="footer">
    <div class="footer-bottom">
      <container class="footer-bottom-inner">
        <div class="footer-part footer-left">
            <md-icon>
              translate
            </md-icon>
            <md-select v-model="selectedLanguage">
              <md-option v-for="(language, index) in languages" :key="language" :value="index">{{ language }}
              </md-option>
            </md-select>
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
    height: auto;
    overflow: hidden;
  }

  .footer-bottom {
    padding: 15px 0;
    width: 100%;

    .footer-bottom-inner {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .footer-part {
    flex: 1;

    @media (max-width: 768px) {
      flex-basis: 100%;
      text-align: center !important;
      margin: 10px 0;

      .md-select {
        text-align: left;
      }
    }
  }

  .footer-right {
    text-align: right;
  }

  .md-icon {
    margin-right: 10px;
  }

  .md-select {
    display: inline-block;
    width: auto;
    vertical-align: middle;

    &:after {
      color: #FFF !important;
    }
  }
</style>
