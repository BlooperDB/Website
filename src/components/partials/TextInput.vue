<template>
  <div class="text-input">
    <span v-if="multiline">
      <textarea ref="textarea" :type="type" :placeholder="placeholder" :value="value" @keyup="passKeyup" @input="updateValue($event.target.value)"></textarea>
    </span>
    <span v-else>
      <input ref="input" :type="type" :placeholder="placeholder" :value="value" @keyup="passKeyup" @input="updateValue($event.target.value)" />
    </span>
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
      },
      multiline: {
        type: Boolean
      }
    },
    methods: {
      getValue() {
        return this.multiline
          ? this.$refs.textarea.value
          : this.$refs.input.value;
      },
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

    input, textarea {
      display: block;
      border: none;
      outline: none;
      border-radius: 0;
      color: #FFF;
      font-family: "Roboto", sans-serif;
      font-weight: 100;
      width: 100%;
      background-color: transparent;

      &::placeholder {
        color: transparentize(#FFF, 0.5);
      }
    }

    textarea {
      resize: none;
      padding: 15px;
      border-radius: 2px;
    }
  }
</style>
