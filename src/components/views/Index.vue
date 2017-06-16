<template>
  <div>
    <section id="masthead">
      <container>
        <div class="masthead-logo">
          <img src="../../assets/img/logo.svg"/>
        </div>
        <h1>Share and download Factorio blueprints.</h1>
      </container>
    </section>
    <section id="popular">
      <container>
        <h1>Popular Blueprints</h1>
      </container>
    </section>
  </div>
</template>

<script>
  import Container from '../partials/Container';

  export default {
    name: 'index',
    components: {
      Container
    }
  };
</script>

<style lang="scss" scoped>
  #masthead {
    background: linear-gradient(to right, #357aff, #57bfff);
    padding: 100px 0;
    text-align: center;
    color: #FFF;

    h1 {
      font-size: 3em;
      font-weight: 100;
    }

    .masthead-logo {
      max-width: 200px;
      margin: 0 auto;
    }

    @media (max-width: 425px) {
      padding: 50px 0;

      h1 {
        font-size: 2em;
        font-weight: 100;
      }

      .masthead-logo {
        margin: 0 auto;
        padding: 0 30px;
      }
    }
  }

  #popular {
    margin-top: 40px;
  }
</style>
