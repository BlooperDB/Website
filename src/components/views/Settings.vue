<template>
  <div>
    <section id="heading">
      <container>
        <h1>{{ $t('navbar.menu.settings') }}</h1>
      </container>
    </section>
    <section id="settings">
      <container>
        <md-input-container>
          <label>{{ $t('settings.placeholder.username') }}</label>
          <md-input v-model="username"></md-input>
        </md-input-container>

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

  export default {
    name: 'settings-view',
    components: {
      Container,
      TextInput
    },
    data() {
      return {
        username: this.$store.getters.user.username,
        error: null
      };
    },
    methods: {
      onSubmit() {
        axios
          .put('/v1/user', {
            username: this.username
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
</style>
