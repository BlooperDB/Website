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
              <v-select
                      class="search-reveal-input"
                      ref="searchInput"
                      :onChange="onChooseTag"
                      :onSearch="autocompleteTags"
                      :options="availableTags"
                      :placeholder="$t('search.placeholder')"
                      :filterable="false"
                      :multiple="true"
                      :debounce="200"
              >
                <span slot="no-options">{{ $t('search.no-options') }}</span>
              </v-select>
            </container>
          </div>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="navbar-search-inner">
        <md-icon class="search-icon">search</md-icon>
        <v-select
                class="search-input"
                ref="searchInput"
                :onChange="onChooseTag"
                :onSearch="autocompleteTags"
                :options="availableTags"
                :placeholder="$t('search.placeholder')"
                :filterable="false"
                :multiple="true"
                :debounce="200"
        >
          <span slot="no-options">{{ $t('search.no_options') }}</span>
        </v-select>
      </div>
    </template>
  </div>
</template>

<script>
  import vSelect from 'vue-select';
  import debounce from 'lodash.debounce';

  import Container from './Container';
  import { SEARCH_SET_RESULTS, SEARCH_SET_QUERY, SEARCH_SET_LOADING_RESULTS } from '../../store/types';
  import { searchBlueprints } from '../../api/blooper/blueprint';
  import { searchTags } from '../../api/blooper/tag';

  export default {
    name: 'navbar-search',
    components: {
      vSelect,
      Container
    },
    data() {
      return {
        searchRevealVisible: false,
        searchQuery: '',
        mobile: window.innerWidth <= 600,
        availableTags: [],
        tags: [],
        beforeSpace: ''
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
      // For some reason this doesn't work with an arrow function
      onChooseTag(tags) {
        this.tags = tags;
        this.searchQuery = this.beforeSpace;
        requestAnimationFrame(() => this.$refs.searchInput.$el.getElementsByTagName('input')[0].focus()); // select textbox
      },
      autocompleteTags(search, loading) {
        this.beforeSpace = search.substring(0, search.lastIndexOf(' ') + 1);
        this.doAutocompleteTags(search, loading);
      },
      // eslint-disable-next-line
      doAutocompleteTags: debounce(function (search, loading) {
        loading(true);
        if (search !== '') {
          const lastWord = search.substring(search.lastIndexOf(' ') + 1);
          if (lastWord === '') {
            this.availableTags = [];
            loading(false);
          } else {
            searchTags(lastWord)
              .then((tags) => {
                this.availableTags = tags;
                loading(false);
              });
          }
        }
        this.searchQuery = search;
      }, 200, { leading: true, trailing: true }),
      // eslint-disable-next-line
      runSearch: debounce(function () {
        const query = [...this.tags, this.searchQuery].join(' ');
        if (query === '') {
          this.$store.commit(SEARCH_SET_RESULTS, []);
        } else {
          searchBlueprints(query);
        }
      }, 400, { leading: true, trailing: true }),
      route(query) {
        if (query === '') {
          this.$router.replace({ name: 'search' });
        } else if (this.$route.name === 'search') {
          this.$router.replace({ name: 'search', params: { query } });
        } else {
          this.$router.push({ name: 'search', params: { query } });
        }
        this.$refs.searchInput.search = query || '';
      }
    },
    watch: {
      searchQuery(newSearchQuery) {
        this.runSearch();
        this.route(newSearchQuery);

        this.$store.commit(SEARCH_SET_LOADING_RESULTS, true);
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

      .dropdown-toggle {
        border: none;

        .selected-tag {
          display: flex;
          align-items: center;
          justify-content: center;

          font-family: Roboto, sans-serif;
          font-weight: 100;
          font-size: 1.2em;
          -webkit-font-smoothing: subpixel-antialiased;

          button {
            padding-left: 2px;
          }
        }

        input {
          color: #fff;
          border-bottom: none !important;
          padding: 10px 15px !important;

          font-family: Roboto, sans-serif;
          font-weight: 100;
          font-size: 1.2em;
          -webkit-font-smoothing: subpixel-antialiased;
        }
      }

      .dropdown-menu {
        li, li > a {
          color: black;
          text-decoration: none;

          font-family: Roboto, sans-serif;
          font-weight: 100;
          font-size: 1.2em;
          -webkit-font-smoothing: subpixel-antialiased;
        }
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

      .dropdown-toggle {
        border: none;

        .selected-tag {
          display: flex;
          align-items: center;
          justify-content: center;

          font-family: Roboto, sans-serif;
          font-weight: 100;
          font-size: 1.2em;
          -webkit-font-smoothing: subpixel-antialiased;

          button {
            padding-left: 2px;
          }
        }

        input {
          color: #000 !important;
          border-bottom: none !important;
          padding: 10px 15px !important;

          font-family: Roboto, sans-serif;
          font-weight: 100;
          font-size: 1.2em;
          -webkit-font-smoothing: subpixel-antialiased;

          &::placeholder {
            color: #CCC !important;
          }
        }
      }

      .dropdown-menu {
        li, li > a {
          color: black;
          text-decoration: none;

          font-family: Roboto, sans-serif;
          font-weight: 100;
          font-size: 1.2em;
          -webkit-font-smoothing: subpixel-antialiased;
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
