<template>
  <div>
    <section id="heading">
      <container>
        <h1 style="margin-left: 8px;">{{ $t('navbar.menu.blueprints') }}</h1>
      </container>
    </section>
    <section id="blueprints">
      <container>
        <div v-if="loading">
          <loader></loader>
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
        <div v-else style="margin-left: 8px;">{{ $t('blueprints.none') }}</div>
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
    name: 'my-blueprints-view',
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
        .get('/v1/user/self/blueprints')
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
  #blueprints {
    width: 100vw;
  }
</style>
