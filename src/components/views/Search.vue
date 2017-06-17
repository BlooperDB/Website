<template>
  <div>
    <section id="results">
      <container>
        <h1>Results</h1>
      </container>
    </section>
  </div>
</template>

<script>
  import Container from '../partials/Container';
  import { SEARCH_SET_QUERY } from '../../store/types';

  export default {
    name: 'search',
    props: ['query'],
    components: {
      Container
    },
    mounted() {
      this.$store.commit(SEARCH_SET_QUERY, this.query);
    }
  };
</script>

<style lang="scss" scoped>

</style>
