<template>
  <div>
    <section id="heading">
      <container>
        <h1>{{ $t('navbar.menu.settings') }}</h1>
      </container>
    </section>
    <section id="settings">
      <container>
        <text-input
          ref="username"
          class="input-area"
          :value="username"
          :placeholder="$t('settings.placeholder.username')"></text-input>

        <md-button
          @click.native="onSubmit"
          class="md-raised md-primary input-button">
            {{ $t('settings.button') }}
        </md-button>
      </container>
    </section>
    <md-snackbar md-position="top center" ref="successSnackbar">
      <span>{{ $t('settings.updated') }}</span>
    </md-snackbar>
    <md-snackbar md-position="top center" ref="errorSnackbar">
      <span v-if="error">{{ $t('errors.' + error.code) }}</span>
    </md-snackbar>
  </div>
</template>

<script>
  import Container from '../partials/Container';
  import TextInput from '../partials/TextInput';
  import axios from '../../api/blooper';
  import store from '../../store';

  export default {
    name: 'settings-view',
    components: {
      Container,
      TextInput
    },
    data() {
      return {
        username: store.getters.user.username,
        error: null
      };
    },
    methods: {
      onSubmit() {
        axios
          .put('/v1/user', {
            username: this.$refs.username.getValue()
          })
          .then((response) => {
            if (response.data.success) {
              this.$refs.successSnackbar.open();
            } else {
              this.error = response.data.error;
              this.$refs.errorSnackbar.open();
            }
          });
      }
    },
    mounted() {
      //
    }
  };
</script>

<style lang="scss">
  .input-area {
    margin-bottom: 20px;

    input {
      padding: 15px;
      font-size: 1.2em;
      background-color: transparentize(#FFF, 0.9) !important;
    }

    textarea {
      height: 20em;
      font-size: 1.2em;
      background-color: transparentize(#FFF, 0.9) !important;
    }
  }

  .input-button {
    font-size: 1.2em;
  }
</style>
