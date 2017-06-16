<template>
  <div class="navbar-search">
    <div class="navbar-search-inner">
      <div class="icon-wrapper" @click="setSearchRevealVisible(true)">
        <icon class="search-icon">search</icon>
      </div>
      <text-input v-model="searchQuery" class="search-input" type="text"
                  placeholder="Search blueprints..."></text-input>
    </div>
    <transition name="fade">
      <div v-if="searchRevealVisible">
        <div class="navbar-search-reveal">
          <container class="navbar-search-reveal-inner">
            <div class="icon-wrapper" @click="setSearchRevealVisible(false)">
              <icon class="back-icon">arrow_back</icon>
            </div>
            <text-input v-model="searchQuery" class="search-reveal-input" type="text"
                        placeholder="Search blueprints..."></text-input>
          </container>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Container from './Container';
  import Icon from './Icon';
  import TextInput from './TextInput';

  export default {
    name: 'navbar-search',
    components: {
      Container,
      Icon,
      TextInput
    },
    data() {
      return {
        searchRevealVisible: false,
        searchQuery: ''
      };
    },
    methods: {
      setSearchRevealVisible(searchRevealVisible) {
        this.searchRevealVisible = searchRevealVisible;
      }
    }
  };
</script>

<style lang="scss">
  .navbar-search {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 30px;

    .navbar-search-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparentize(#333, 0.9);
      flex: 1;
      padding-left: 15px;
      border-radius: 5px;
    }

    .search-input {
      flex: 1;

      input {
        font-size: 1.2em;
        border-bottom: none !important;
        padding: 10px 15px !important;
      }
    }
    .search-icon {
      color: #FFF;
    }

    @media (max-width: 425px) {
      margin-right: 20px;

      .navbar-search-inner {
        background-color: transparent;
        justify-content: flex-end;
      }

      .search-input {
        display: none;
      }

      .search-icon {
        cursor: pointer;
      }
    }
  }

  .navbar-search-reveal {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFF;
    display: flex;
    align-items: center;

    .navbar-search-reveal-inner {
      display: flex;
      align-items: center;
    }

    .search-reveal-input {
      flex: 1;
      margin-left: 10px;

      input {
        color: #000 !important;
        font-size: 1.2em;

        &::placeholder {
          color: #CCC !important;
        }
      }
    }

    .back-icon {
      cursor: pointer;
    }

    @media (min-width: 426px) {
      display: none;
    }
  }

  .icon-wrapper {
    height: 24px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
