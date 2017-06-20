<template>
  <div class="navbar-search">
    <template v-if="mobile">
      <md-button @click.native="setSearchRevealVisible(true)" class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>
      <transition name="fade">
        <div v-if="searchRevealVisible">
          <div class="navbar-search-reveal">
            <container class="navbar-search-reveal-inner">
              <md-icon class="back-icon" @click.native="setSearchRevealVisible(false)">arrow_back</md-icon>
              <text-input v-model="searchQuery" class="search-reveal-input" type="text"
                          :placeholder="$t('search.placeholder')" @keyup.enter="route(searchQuery)"></text-input>
            </container>
          </div>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="navbar-search-inner">
        <md-icon class="search-icon">search</md-icon>
        <text-input v-model="searchQuery" class="search-input" type="text"
                    :placeholder="$t('search.placeholder')" @keyup.enter="route(searchQuery)"></text-input>
      </div>
    </template>
  </div>
</template>

<script>
  import debounce from 'lodash.debounce';
  import Container from './Container';
  import TextInput from './TextInput';
  import { SEARCH_SET_QUERY } from '../../store/types';

  export default {
    name: 'navbar-search',
    components: {
      Container,
      TextInput
    },
    data() {
      return {
        searchRevealVisible: false,
        searchQuery: '',
        mobile: window.innerWidth <= 600
      };
    },
    computed: {
      originalQuery() {
        return this.$store.state.search.query;
      }
    },
    methods: {
      setSearchRevealVisible(searchRevealVisible) {
        this.searchRevealVisible = searchRevealVisible;
      },
      // Wait for the user to stop typing
      runSearch: debounce(() => {
        // TODO make request to API
      }, 500),
      route(query) {
        if (query === '') {
          this.$router.replace({ name: 'search' });
          return;
        }

        if (this.$route.name === 'search') {
          this.$router.replace({ name: 'search', params: { query } });
        } else {
          this.$router.push({ name: 'search', params: { query } });
        }
      }
    },
    watch: {
      searchQuery(newSearchQuery) {
        this.runSearch();
        this.route(newSearchQuery);

        this.$store.commit(SEARCH_SET_QUERY, this.searchQuery);
      },
      originalQuery(newSearchQuery) {
        this.searchQuery = newSearchQuery;
      }
    },
    mounted() {
      window.addEventListener('resize', () => {
        requestAnimationFrame(() => {
          this.mobile = window.innerWidth <= 600;
        });
      });
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

    @media (max-width: 600px) {
      justify-content: flex-end;
      margin: 0;
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
    z-index: 5;

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
      color: #333;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
