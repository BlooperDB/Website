<template>
  <div>
    <section id="upload">
      <container>
        <h1>Add a Blueprint</h1>
        <text-input class="input-area" placeholder="Paste a blueprint code here" multiline></text-input>
        <styled-button class="input-button">Add Blueprint</styled-button>
      </container>
    </section>
  </div>
</template>

<script>
  import Container from '../partials/Container';
  import StyledButton from '../partials/StyledButton';
  import TextInput from '../partials/TextInput';

  export default {
    name: 'search',
    components: {
      Container,
      StyledButton,
      TextInput
    }
  };
</script>

<style lang="scss">
  .input-area {
    margin-bottom: 20px;

    textarea {
      font-size: 1.2em;
      height: 20em;
      background-color: transparentize(#FFF, 0.9) !important;
    }
  }

  .input-button {
    font-size: 1.2em;
  }
</style>
