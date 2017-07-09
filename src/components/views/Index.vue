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
        <md-input-container>
          <md-select name="sorting" id="sorting" v-model="sorting">
            <md-option value="popular">{{ $t('index.popularBlueprints') }}</md-option>
            <md-option value="top">{{ $t('index.topBlueprints') }}</md-option>
            <md-option value="new">{{ $t('index.newBlueprints') }}</md-option>
          </md-select>
        </md-input-container>

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
        blueprints: [],
        sorting: 'popular'
      };
    },
    mounted() {
      axios
        .get('/v1/blueprints/popular')
        .then((response) => {
          if (response.data.success) {
            const data = response.data.data;
            this.blueprints = data.blueprints;
          }
          this.loading = false;
        });
    },
    watch: {
      sorting() {
        this.blueprints = [];
        this.loading = true;

        let url = '/v1/blueprints';
        switch (this.sorting) {
          case 'top':
            url += '/top';
            break;
          case 'new':
            url += '/new';
            break;
          default:
            url += '/popular';
            break;
        }

        axios
          .get(url)
          .then((response) => {
            if (response.data.success) {
              const data = response.data.data;
              this.blueprints = data.blueprints;
            }
            this.loading = false;
          });
      }
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

    .md-input-container {

      width: auto;

      &:after {
        background: 0;
      }

      .md-select {
        width: auto;
      }
    }

    .md-theme-default.md-select:after {
      color: #fff;
    }
  }
</style>
