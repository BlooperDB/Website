<template>
  <transition name="modal">
    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper" @click.self="hide()">
        <div class="modal-container">
          <div class="modal-header">
            <div class="modal-header-content">
              <slot name="header"></slot>
            </div>
            <div class="modal-close-button" @click="hide()"><icon>close</icon></div>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Icon from './Icon';

  export default {
    name: 'modal',
    components: {
      Icon
    },
    data() {
      return {
        showModal: false,
        show() {
          this.showModal = true;
        },
        hide() {
          this.showModal = false;
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    color: #333;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    font-weight: normal;
  }

  .modal-header {
    display: flex;
    align-items: center;

    .modal-header-content {
      flex: 1;
    }

    .modal-close-button {
      cursor: pointer;
    }
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-enter-active, .modal-leave-active {
    transition: opacity .3s ease, transform .3s ease;
  }

  .modal-enter, .modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
  }
</style>
