<template>
  <div>
    <section id="upload">
      <container>
        <h1>{{ $t('create.title') }}</h1>
        <text-input
          ref="name"
          class="input-area"
          :placeholder="$t('create.placeholder.name')"></text-input>

        <text-input
          ref="description"
          class="input-area"
          :placeholder="$t('create.placeholder.description')"></text-input>

        <text-input
          ref="blueprint"
          class="input-area"
          :placeholder="$t('create.placeholder.blueprint')"
          multiline></text-input>

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
        error: null
      };
    },
    watch: {
      error() {
        this.$refs.errorSnackbar.open();
      }
    },
    methods: {
      onSubmit() {
        const name = this.$refs.name.getValue();
        const description = this.$refs.description.getValue();
        const blueprint = this.$refs.blueprint.getValue();
        axios
          .post('/v1/blueprint', {
            name,
            description,
            'blueprint-string': blueprint
          })
          .then((response) => {
            const data = response.data;
            if (data.success) {
              const blueprintResponse = data.data;
              const blueprintId = blueprintResponse['blueprint-id'];
              const globalRevisionId = blueprintResponse['revision-id'];
              const localRevisionId = blueprintResponse.revision;
              console.log(blueprintId, globalRevisionId, localRevisionId);
            } else {
              this.error = data.error;
            }
          });
      }
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
