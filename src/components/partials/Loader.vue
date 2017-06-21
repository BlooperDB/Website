<template>
  <div class="loading-icon">
    <img src="../../assets/img/logo.svg"/>
  </div>
</template>

<script>
  export default {
    name: 'loader'
  };
</script>

<style lang="scss" scoped>
  .loading-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      animation: rotate 3s infinite;
      backface-visibility: hidden;
      width: 100%;
      max-width: 100px;
      margin: 20px;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg) translateZ(0) scale(1.0, 1.0);
    }
    100% {
      transform: rotate(360deg) translateZ(0) scale(1.0, 1.0);
    }
  }
</style>
