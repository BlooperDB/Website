<template>
  <div>
    <template v-if="blueprint">
      <section id="blueprintPreview">
        <blueprint-preview :blueprint="blueprintRender"></blueprint-preview>
      </section>
      <section id="blueprintInfo">
        <md-tabs md-fixed>
          <md-tab :md-label="$t('view.tabs.overview')">
            <container v-if="blueprint">
              <md-layout md-column-small>
                <md-layout>
                  <div>
                    <h1 class="blueprint-name">
                      {{ blueprint.name }}
                      <span v-if="author" class="subheader">{{ $t('view.overview.by') }} <router-link
                        :to="`/user/${author.id}`">{{ author.username }}</router-link></span>
                    </h1>
                    <p>{{ blueprint.description }}</p>
                  </div>
                </md-layout>
                <md-layout md-flex="25">
                  <div class="sidebar-container">
                    <md-button class="md-raised md-primary blueprint-copy" v-clipboard="blueprintString">
                      <md-icon>content_copy</md-icon>
                      <span>Copy Blueprint</span>
                    </md-button>
                  </div>
                </md-layout>
              </md-layout>
            </container>
          </md-tab>

          <md-tab :md-label="$t('view.tabs.revisions')">
            <container v-if="revisions">
              <md-layout md-row>
                <md-layout
                  v-for="(revision, index) in revisions"
                  :key="'rev'+index"
                  md-flex-xsmall="100"
                  md-flex-small="50"
                  md-flex-medium="50"
                  md-flex-large="25"
                  md-flex-xlarge="20">

                  <md-card md-with-hover class="revision-card" style="position: relative; width: 100%;">
                    <router-link :to="`/view/${blueprint.id}/revision/${revision.revision}`">
                      <md-card-media-cover md-text-scrim style="background-color: #333">
                        <md-card-media md-ratio="1:1">
                          <img src="../../assets/img/logo.svg" style="padding: 15px;">
                          <img :src="revision.thumbnail" v-show="revision.thumbnail">
                        </md-card-media>

                        <md-card-area>
                          <md-card-header>
                            <div class="md-title">Revision {{ revision.revision }}</div>
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
            <container v-if="moreFromUser">
              <md-layout md-row>
                <md-layout
                  v-for="(blueprint, index) in moreFromUser"
                  :key="'userbp'+index"
                  md-flex-xsmall="100"
                  md-flex-small="50"
                  md-flex-medium="50"
                  md-flex-large="25"
                  md-flex-xlarge="20"
                  style="padding: 15px; width: 100%">

                  <router-link :to="`/view/${blueprint.id}`" style="width: 100%">
                    <blueprint-card
                      :id="blueprint.id"
                      :revision="blueprint['latest-revision']"
                      :initialBlueprint="blueprint"
                      style="width: 100%"
                      ></blueprint-card>
                  </router-link>
                </md-layout>
              </md-layout>
            </container>
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
  import axios from 'axios';
  import { getUser, getUserBlueprints } from '../../api/blooper/user';
  import { getBlueprint, getBlueprintRevision, getRevisions } from '../../api/blooper/blueprint';

  import BlueprintCard from '../partials/BlueprintCard';
  import BlueprintPreview from '../partials/BlueprintPreview';
  import Container from '../partials/Container';
  import Loader from '../partials/Loader';

  export default {
    name: 'view-view',
    props: {
      blueprintId: {
        required: true
      },
      revisionId: {}
    },
    components: {
      BlueprintCard,
      BlueprintPreview,
      Container,
      Loader
    },
    data() {
      return {
        blueprint: null,
        revision: null,
        revisions: [],
        moreFromUser: null,
        author: null,
        blueprintRender: null,
        blueprintString: null
      };
    },
    mounted() {
      this.reloadBlueprint();
    },
    methods: {
      reloadBlueprint() {
        getBlueprint(this.blueprintId)
          .then((blueprint) => {
            this.blueprint = blueprint;

            getUser(blueprint.user)
              .then((author) => {
                this.author = author;
              });

            getUserBlueprints(blueprint.user)
              .then((blueprints) => {
                this.moreFromUser = blueprints.filter(b => b.id !== blueprint.id);
                this.moreFromUser.forEach((b) => {
                  axios
                    .head(b.thumbnail)
                    .then(() => {})
                    .catch(() => {
                      b.thumbnail = undefined;
                    });
                });
              });

            if (this.revisionId === undefined) {
              getBlueprintRevision(this.blueprintId, this.blueprint['latest-revision'])
                .then((revision) => {
                  this.revision = revision;
                  this.blueprintRender = revision.render;

                  axios
                    .get(this.revision.blueprint)
                    .then((blueprintString) => {
                      this.blueprintString = blueprintString.data;
                    });
                });
            }
          });

        if (this.revisionId !== undefined) {
          getBlueprintRevision(this.blueprintId, this.revisionId)
            .then((revision) => {
              this.revision = revision;
              this.blueprintRender = revision.render;

              axios
                .get(this.revision.blueprint)
                .then((blueprintString) => {
                  this.blueprintString = blueprintString.data;
                });
            });
        }

        getRevisions(this.blueprintId)
          .then((revisions) => {
            this.revisions = revisions;
            this.revisions.forEach((r) => {
              axios
                .head(r.thumbnail)
                .then(() => {})
                .catch(() => {});
            });
          });
      }
    },
    watch: {
      $route(to) {
        this.blueprintId = to.params.blueprintId;
        this.reloadBlueprint();
        // TODO Move to first tab
      }
    }
  };
</script>

<style lang="scss" scoped>
  .subheader {
    font-size: 0.4em;
    color: #CCC;
    font-weight: normal;
  }

  .revision-card {
    margin: 8px;
    color: #333;
    background-color: #fff;

    a:not(.md-button) {
      color: #333;
      text-decoration: none;
    }

    .hidden {
      opacity: 0;
    }

    img {
      transition:opacity 0.5s linear;
      background-color: rgb(40, 40, 40);
    }
  }

  .md-title, .md-subhead {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .sidebar-container {
    width: 100%;
    margin-top: 34px;
  }

  .blueprint-copy {
    display: block;
    width: 100%;
    margin: 0;
  }
</style>
