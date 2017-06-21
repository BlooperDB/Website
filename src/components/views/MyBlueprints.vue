<template>
  <div>
    <section id="results">
      <container>
        <h1>My Blueprints</h1>
      </container>
    </section>
  </div>
</template>

<script>
  import Container from '../partials/Container';

  export default {
    name: 'my-blueprints-view',
    props: ['query'],
    components: {
      Container
    }
  };
</script>

<style lang="scss" scoped>

</style>
