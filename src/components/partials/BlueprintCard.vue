<template>
  <md-card v-if="blueprint" md-with-hover class="blueprint-card" style="position: relative; width: 100%;">
    <router-link :to="`/view/${blueprint.id}`">
      <md-card-media-cover md-text-scrim>
        <md-card-media md-ratio="1:1">
          <img src="../../assets/img/logo.svg" style="padding: 15px; background-color: #e44;">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <div class="md-title">{{ blueprint.name }}</div>
            <div class="md-subhead">{{ blueprint.description }}</div>
          </md-card-header>

          <md-card-actions class="card-tags" v-if="blueprint.tags.length > 0">
            <div>
              <md-chip
                v-for="(tag, idx) in blueprint.tags"
                :key="idx"
                style="margin-left: 5px">{{ tag }}
              </md-chip>
            </div>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </router-link>
  </md-card>
</template>

<script>
  import { getBlueprint } from '../../api/blooper/blueprint';

  export default {
    name: 'blueprint-card',
    props: {
      id: {
        type: Number,
        required: true
      },
      revision: {
        type: Number,
        required: true
      },
      initialBlueprint: {
        type: Object
      }
    },
    data() {
      return {
        blueprint: this.initialBlueprint
      };
    },
    beforeMount() {
      if (!this.blueprint) {
        getBlueprint(this.id)
          .then((response) => {
            if (response.data.success) {
              this.blueprint = response.data.data;
            }
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
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
