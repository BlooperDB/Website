<template>
  <div class="card-part" :class="{ noPad: noPad }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: ['no-pad']
  };
</script>

<style lang="scss" scoped>
  .card-part {
    padding: 20px 15px;

    &.no-pad {
      padding: 0;
    }
  }
</style>
