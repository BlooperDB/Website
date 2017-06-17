<template>
  <div class="text-input">
    <input :type="type" :placeholder="placeholder" :value="value" @keyup="passKeyup" @input="updateValue($event.target.value)" />
  </div>
</template>

<script>
  const acceptableTypes = [
    'text', 'email', 'password', 'search', 'url'
  ];

  export default {
    name: 'text-input',
    props: {
      type: {
        type: String,
        default() {
          return 'text';
        },
        validator(value) {
          return acceptableTypes.includes(value);
        }
      },
      placeholder: {
        type: String
      },
      value: {
        type: String
      }
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value);
      },
      passKeyup(event) {
        this.$emit('keyup', event);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .text-input {
    width: 100%;

    input {
      display: block;
      border: none;
      border-bottom: 1px solid #FFF;
      outline: none;
      background-color: transparent;
      border-radius: 0;
      color: #FFF;
      font-family: "Roboto", sans-serif;
      font-weight: 100;
      width: 100%;
      padding: 10px 5px;

      &::placeholder {
        color: transparentize(#FFF, 0.5);
      }
    }
  }
</style>
