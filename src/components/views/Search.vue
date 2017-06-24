<template>
  <div>
    <section id="results">
      <container>
        <h1>Search Results</h1>
        <transition name="page" mode="out-in">
          <loader v-if="loading"></loader>
          <template v-else-if="blueprints && blueprints.length > 0">
            <md-layout class="blueprint-list" md-row>
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
          </template>
          <div v-else>{{ $t('blueprints.none') }}</div>
        </transition>
      </container>
    </section>
  </div>
</template>

<script>
  import BlueprintCard from '../partials/BlueprintCard';
  import Container from '../partials/Container';
  import Loader from '../partials/Loader';
  import { SEARCH_SET_QUERY } from '../../store/types';

  export default {
    name: 'search-view',
    props: ['query'],
    components: {
      BlueprintCard,
      Container,
      Loader
    },
    mounted() {
      this.$store.commit(SEARCH_SET_QUERY, this.query);
    },
    computed: {
      blueprints() {
        return this.$store.getters.results;
      },
      loading() {
        return this.$store.getters.loadingResults;
      }
    }
  };
</script>

<style lang="scss">
  #results {
    height: 100%;

    .container {
      height: 100%;
      position: relative;
    }
  }
</style>
