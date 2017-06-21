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
                <span v-if="author" class="subheader">by <router-link :to="`/user/${author.id}`">{{ author.username }}</router-link></span>
              </h1>
              <p>{{ blueprint.description }}</p>
            </container>
          </md-tab>

          <md-tab :md-label="$t('view.tabs.revisions')">

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
  import { getBlueprint } from '../../api/blooper/blueprint';

  import BlueprintPreview from '../partials/BlueprintPreview';
  import Container from '../partials/Container';
  import Loader from '../partials/Loader';

  export default {
    name: 'view-view',
    props: ['id'],
    components: {
      BlueprintPreview,
      Container,
      Loader
    },
    data() {
      return {
        blueprint: null,
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
    }
  };
</script>

<style lang="scss" scoped>
  .loader-container {
    height: calc(100vh - 80px);
  }
  .subheader {
    font-size: 0.4em;
    color: #CCC;
    font-weight: normal;
  }
</style>
