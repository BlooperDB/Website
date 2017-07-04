<template>
  <div>
    <template v-if="blueprint">
      <section id="blueprintPreview">
        <blueprint-preview></blueprint-preview>
      </section>
      <section id="blueprintInfo">
        <md-tabs md-fixed>
          <md-tab :md-label="$t('view.tabs.overview')">
            <container>
              <h1 class="blueprint-name">
                {{ blueprint.name }}
                <span v-if="author" class="subheader">{{ $t('view.overview.by') }} <router-link
                  :to="`/user/${author.id}`">{{ author.username }}</router-link></span>
              </h1>
              <p>{{ blueprint.description }}</p>
            </container>
          </md-tab>

          <md-tab :md-label="$t('view.tabs.revisions')">
            <container v-if="revisions">
              <md-layout md-row>
                <md-layout
                  v-for="(revision, index) in revisions"
                  :key="index"
                  md-flex-xsmall="100"
                  md-flex-small="50"
                  md-flex-medium="50"
                  md-flex-large="25"
                  md-flex-xlarge="20">

                  <md-card md-with-hover class="blueprint-card" style="position: relative; width: 100%;">
                    <router-link :to="`/view/${blueprint.id}/revision/${revision.id}`">
                      <md-card-media-cover md-text-scrim>
                        <md-card-media md-ratio="1:1">
                          <img src="../../assets/img/logo.svg" style="padding: 15px; background-color: #e44;">
                        </md-card-media>

                        <md-card-area>
                          <md-card-header>
                            <div class="md-title">Version {{ revision.version }}</div>
                          </md-card-header>
                        </md-card-area>
                      </md-card-media-cover>
                    </router-link>
                  </md-card>
                </md-layout>
              </md-layout>
            </container>
          </md-tab>

          <md-tab :md-label="$t('view.tabs.moreFromUser')">

          </md-tab>
        </md-tabs>
      </section>
    </template>
    <div class="loader-container" v-else>
      <loader></loader>
    </div>
  </div>
</template>

<script>
  import { getUser } from '../../api/blooper/user';
  import { getBlueprint, getRevisions } from '../../api/blooper/blueprint';

  import BlueprintCard from '../partials/BlueprintCard';
  import BlueprintPreview from '../partials/BlueprintPreview';
  import Container from '../partials/Container';
  import Loader from '../partials/Loader';

  export default {
    name: 'view-view',
    props: ['id', 'revision'],
    components: {
      BlueprintCard,
      BlueprintPreview,
      Container,
      Loader
    },
    data() {
      return {
        blueprint: null,
        revisions: {},
        author: null
      };
    },
    mounted() {
      getBlueprint(this.id)
        .then((blueprint) => {
          this.blueprint = blueprint;

          getUser(blueprint.user)
            .then((author) => {
              this.author = author;
            });
        });

      getRevisions(this.id)
        .then((revisions) => {
          this.revisions = revisions;
        });
    }
  };
</script>

<style lang="scss" scoped>
  .subheader {
    font-size: 0.4em;
    color: #CCC;
    font-weight: normal;
  }

  .blueprint-card {
    margin: 8px;
    color: #333;
    background-color: #fff;

    a:not(.md-button) {
      color: #333;
      text-decoration: none;
    }
  }

  .md-title, .md-subhead {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
