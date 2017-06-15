<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <div class="logo-block">
          <img src="../../assets/img/logo.svg">
        </div>
        <div class="text-block">
          Blooper
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navbar'
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";

  .navbar {
    background: linear-gradient(to right, #357aff, #57bfff);
    height: 80px;
    width: 100%;

    .container {
      display: flex;
      height: 100%;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      .logo-block {
        flex: 1;
        width: 40px;
        margin-right: 10px;
      }

      .text-block {
        font-size: 2em;
        font-weight: 100;
        color: #FFF;
      }

      &:hover .logo-block img {
        animation: rotate 3s infinite;
        backface-visibility: hidden;
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
