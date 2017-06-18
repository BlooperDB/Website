<template>
  <div class="wrapper">
    <div class="login-area">
      <card>
        <card-part>
          <h1>{{ $t('login.headerText') }}</h1>
        </card-part>
        <card-part>
          <google-sso-button></google-sso-button>
        </card-part>
      </card>
    </div>
  </div>
</template>

<script>
  import Card from '../partials/Card';
  import CardPart from '../partials/CardPart';
  import Container from '../partials/Container';
  import GoogleSsoButton from '../partials/GoogleSsoButton';
  import TextInput from '../partials/TextInput';

  export default {
    name: 'search',
    components: {
      Card,
      CardPart,
      Container,
      GoogleSsoButton,
      TextInput
    }
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .login-area {
    max-width: 500px;
    width: 100%;
    margin: 0 20px;

    h1 {
      margin: 0;
    }
  }
</style>
