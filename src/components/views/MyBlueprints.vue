<template>
  <div>
    <section id="results">
      <container>
        <h1>{{ $t('navbar.menu.blueprints') }}</h1>
      </container>
    </section>
  </div>
</template>

<script>
  import Container from '../partials/Container';

  export default {
    name: 'my-blueprints-view',
    components: {
      Container
    }
  };
</script>

<style lang="scss" scoped>

</style>
