<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'card'
  };
</script>

<style lang="scss" scoped>
  .card {
    border-radius: 2px;
    background-color: #FFF;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    color: #333;
    padding: 20px 0;
  }
</style>
