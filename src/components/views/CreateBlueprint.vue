<template>
  <div>
    <section id="upload">
      <container>
        <h1>{{ $t('create.title') }}</h1>

        <md-input-container>
          <label>{{ $t('create.placeholder.name') }}</label>
          <md-input v-model="name"></md-input>
        </md-input-container>

        <md-input-container>
          <label>{{ $t('create.placeholder.description') }}</label>
          <md-input v-model="description"></md-input>
        </md-input-container>

        <md-input-container>
          <label>{{ $t('create.placeholder.blueprint') }}</label>
          <md-textarea v-model="blueprint"></md-textarea>
        </md-input-container>

        <md-button
          @click.native="onSubmit"
          class="md-raised md-primary input-button">
            {{ $t('create.button') }}
        </md-button>
      </container>
    </section>
    <md-snackbar md-position="top center" ref="errorSnackbar">
      <span v-if="error">{{ $t('errors.' + error.code) || error.message }}</span>
    </md-snackbar>
  </div>
</template>

<script>
  import Container from '../partials/Container';
  import TextInput from '../partials/TextInput';
  import axios from '../../api/blooper';

  export default {
    name: 'create-view',
    components: {
      Container,
      TextInput
    },
    data() {
      return {
        error: null,
        name: '',
        description: '',
        blueprint: ''
      };
    },
    watch: {
      error() {
        this.$refs.errorSnackbar.open();
      }
    },
    methods: {
      onSubmit() {
        axios
          .post('/v1/blueprint', {
            name: this.name,
            description: this.description,
            'blueprint-string': this.blueprint
          })
          .then((response) => {
            const data = response.data;
            if (data.success) {
              const blueprintResponse = data.data;
              const blueprintId = blueprintResponse['blueprint-id'];

              this.$router.push({ name: 'view', params: { id: blueprintId } });
            } else {
              this.error = data.error;
            }
          });
      }
    }
  };
</script>

<style lang="scss">
  .md-button {
    margin: 0;
  }
</style>
