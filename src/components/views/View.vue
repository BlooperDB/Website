<template>
  <div>
    <section id="blueprintPreview">
      <blueprint-preview></blueprint-preview>
    </section>
  </div>
</template>

<script>
  import BlueprintPreview from '../partials/BlueprintPreview';
  import Container from '../partials/Container';

  export default {
    name: 'view-view',
    components: {
      BlueprintPreview,
      Container
    }
  };
</script>

<style lang="scss" scoped>

</style>
