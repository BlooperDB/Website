<template>
  <i class="material-icons" @click="click"><slot></slot></i>
</template>

<script>
  export default {
    name: 'icon',
    methods: {
      click(event) {
        this.$emit('click', event);
      }
    }
  };
</script>
