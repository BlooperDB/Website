<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'container'
  };
</script>

<style lang="scss" scoped>
  .container {
    padding: 0 200px;

    @media (max-width: 1640px) {
      padding: 0 100px;
    }

    @media (max-width: 1024px) {
      padding: 0 50px;
    }

    @media (max-width: 768px) {
      padding: 0 25px;
    }
  }
</style>
