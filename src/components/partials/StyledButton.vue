<template>
  <div>
    <router-link v-if="to" :to="to">
      <button @click="this.click" class="button" :class="{ icon: icon, shadow: shadow }">
        <slot></slot>
      </button>
    </router-link>
    <template v-else>
      <button @click="this.click" class="button" :class="{ icon: icon, shadow: shadow }">
        <slot></slot>
      </button>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'button',
    props: ['icon', 'shadow', 'to'],
    methods: {
      click(event) {
        const button = this.$el.querySelector('.button');
        const bounding = button.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');

        const xPos = (event.pageX - bounding.left) - (ripple.offsetWidth / 2);
        const yPos = (event.pageY - bounding.top) - (ripple.offsetHeight / 2);

        ripple.style.left = `${xPos}px`;
        ripple.style.top = `${yPos}px`;

        ripple.addEventListener('animationend', () => {
          button.removeChild(ripple);
        });

        button.appendChild(ripple);
        this.$emit('click', event);
      }
    }
  };
</script>

<style lang="scss">
  .button {
    background: #357aff;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    padding: 0.7em 1.5em;
    color: #FFF;
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    position: relative;
    overflow: hidden;
    outline: none;
    font-size: inherit;
    transition: background 0.3s ease-in-out;

    &:focus, &:hover, &:active {
      background-color: lighten(#357aff, 5%);
    }

    .ripple-effect {
      position: absolute;
      background-color: transparentize(#FFF, 0.5);
      border-radius: 50%;
      width: 10px;
      height: 10px;
      animation: ripple 1s ease-out;
    }

    &.icon {
      border-radius: 50%;
      background-color: transparent;
      padding: 0.5em;

      &:focus, &:hover, &:active {
        background-color: transparentize(#FFF, 0.8);
      }
    }
    &.shadow {
      box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
    }
  }

  @keyframes ripple {
    from {
      transform: scale(1);
      opacity: 0.4;
    }
    to {
      transform: scale(100);
      opacity: 0;
    }
  }
</style>
