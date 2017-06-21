<template>
  <md-card md-with-hover class="blueprint-card" style="position: relative; width: 100%;">

    <md-card-media>
      <img src="../../assets/img/logo.svg" style="padding: 15px; background-color: #e44;">
    </md-card-media>

    <md-card-header style="margin-bottom: 40px;">
      <div class="md-title">{{ blueprint.name }}</div>
      <div class="md-subhead">{{ blueprint.description }}</div>
    </md-card-header>

    <md-card-actions v-if="blueprint.tags.length > 0" style="position: absolute; bottom: 0; right: 0;">
      <div style="">
        <md-chip
          v-for="(tag, idx) in blueprint.tags"
          :key="idx"
          style="margin-left: 5px">{{ tag }}</md-chip>
      </div>
    </md-card-actions>
  </md-card>
</template>

<script>
  import axios from '../../api/blooper';

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
    mounted() {
      if (!this.blueprint) {
        axios
          .get(`/v1/blueprint/${this.id}/revision/${this.revision}`)
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
    color: black;
    background-color: #fff;

  }
</style>
