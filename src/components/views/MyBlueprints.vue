<template>
  <div>
    <section id="heading">
      <container>
        <h1 style="margin-left: 8px;">{{ $t('navbar.menu.blueprints') }}</h1>
      </container>
    </section>
    <section id="blueprints">
      <container>
        <div v-if="loading" style="margin-left: 8px;">{{ $t('state.loading') }}</div>
        <div v-else-if="rows.length > 0">
          <md-layout
            v-for="(row, ridx) in rows"
            :key="ridx"
            md-row>
            <md-layout
              class="card-rows"
              v-for="(blueprint, bidx) in row"
              :key="blueprint.id"
              :md-flex="percentage">
              <blueprint-card
                :id="blueprint.id"
                :revision="1"
                :initialBlueprint="blueprint"></blueprint-card>
            </md-layout>
          </md-layout>
          <div style="height: 30px"><br></div>
        </div>
        <div v-else style="margin-left: 8px;">{{ $t('blueprints.none') }}</div>
      </container>
    </section>
  </div>
</template>

<script>
  import Container from '../partials/Container';
  import BlueprintCard from '../partials/BlueprintCard';
  import axios from '../../api/blooper';

  const ITEMS_PER_ROW = 4;

  export default {
    name: 'my-blueprints-view',
    components: {
      Container,
      BlueprintCard
    },
    data() {
      return {
        loading: true,
        percentage: 100 / ITEMS_PER_ROW,
        blueprints: []
      };
    },
    computed: {
      rows() {
        const blueprints = this.blueprints;
        // eslint-disable-next-line
        return blueprints.map((e, i, a) => {
          return i % ITEMS_PER_ROW
            ? null
            : a.slice(i, i + ITEMS_PER_ROW);
        }).filter(e => e);
      }
    },
    mounted() {
      axios
        .get('/v1/user/self/blueprints')
        .then((response) => {
          if (response.data.success) {
            const data = response.data.data;
            this.blueprints = data.blueprints;
          }
          this.loading = false;
        });
    }
  };
</script>

<style lang="scss" scoped>

</style>
