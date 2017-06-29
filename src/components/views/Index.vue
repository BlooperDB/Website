<template>
  <div>
    <section id="masthead">
      <container>
        <div class="masthead-logo">
          <img src="../../assets/img/logo.svg"/>
        </div>
        <h1>{{ $t('index.slogan') }}</h1>
      </container>
    </section>
    <section id="popular">
      <container>
        <h1>{{ $t('index.popularBlueprints') }}</h1>

        <div v-if="loading">
          <loader not-center></loader>
        </div>
        <div v-else-if="blueprints.length > 0">
          <md-layout md-row>
            <md-layout
              v-for="(blueprint, bidx) in blueprints"
              :key="'blueprint'+bidx"
              md-flex-xsmall="100"
              md-flex-small="50"
              md-flex-medium="50"
              md-flex-large="25"
              md-flex-xlarge="20">
              <blueprint-card
                :id="blueprint.id"
                :revision="1"
                :initialBlueprint="blueprint"></blueprint-card>
            </md-layout>
          </md-layout>
        </div>
      </container>
    </section>
  </div>
</template>

<script>
  import Container from '../partials/Container';
  import Loader from '../partials/Loader';
  import BlueprintCard from '../partials/BlueprintCard';
  import axios from '../../api/blooper';

  export default {
    name: 'index-view',
    components: {
      Container,
      BlueprintCard,
      Loader
    },
    data() {
      return {
        loading: true,
        blueprints: []
      };
    },
    mounted() {
      axios
        .get('/v1/blueprints/popular')
        .then((response) => {
          if (response.data.success) {
            const data = response.data.data;
            this.blueprints = data.blueprints;
            // eslint-disable-next-line no-console
            console.log(data.blueprints);
          }
          this.loading = false;
        });
    }
  };
</script>

<style lang="scss" scoped>
  #masthead {
    background: linear-gradient(to right, #357aff, #57bfff);
    padding: 100px 0;
    text-align: center;
    color: #FFF;
    box-shadow: 0 3px 1px rgba(0, 0, 0, 0.12), 0 2px 1px rgba(0, 0, 0, 0.24);

    h1 {
      font-size: 3em;
      font-weight: 100;
    }

    .masthead-logo {
      max-width: 200px;
      margin: 0 auto;
      pointer-events: none;
    }

    @media (max-width: 425px) {
      padding: 50px 0;

      h1 {
        font-size: 2em;
        font-weight: 100;
      }

      .masthead-logo {
        margin: 0 auto;
        padding: 0 30px;
      }
    }
  }

  #popular {
    margin-top: 40px;
  }
</style>
