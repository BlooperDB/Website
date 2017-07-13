<template>
    <div id="blueprintCanvasWrapper" :class="{ fullscreen: fullscreen }">
      <canvas id="blueprintCanvas"></canvas>
      <div class="blueprint-controls">
        <div v-if="fullscreen">
          <md-icon class="control-icon" @click.native="setFullscreen(false)">fullscreen_exit</md-icon>
        </div>
        <div v-else>
          <md-icon class="control-icon" @click.native="setFullscreen(true)">fullscreen</md-icon>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import Container from './Container';

  export default {
    name: 'blueprint-preview',
    components: {
      Container
    },
    props: {
      blueprint: {
        required: true
      }
    },
    data() {
      return {
        dimensions: {
          width: 0,
          height: 0
        },
        parent: null,
        canvas: null,
        ctx: null,
        placeholderText: 'Loading...',
        fullscreen: false,
        renderImage: null
      };
    },
    mounted() {
      this.parent = document.getElementById('blueprintCanvasWrapper');
      this.canvas = document.getElementById('blueprintCanvas');
      this.ctx = this.canvas.getContext('2d');

      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      this.handleResize();
      window.addEventListener('resize', this.handleResize);

      if (this.blueprint !== null) {
        this.loadBlueprintImage();
      }

      this.draw();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        requestAnimationFrame(() => {
          this.canvas.width = this.dimensions.width = window.innerWidth;
          this.canvas.height = this.dimensions.height = window.innerHeight;

          this.canvas.style.width = `${window.innerWidth}px`;
          this.canvas.style.height = `${window.innerHeight}px`;

          if (window.devicePixelRatio > 1) {
            this.canvas.width *= window.devicePixelRatio;
            this.canvas.height *= window.devicePixelRatio;

            this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
          }
        });
      },
      draw() {
        requestAnimationFrame(() => {
          this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);

          if (this.renderImage === null) {
            this.ctx.fillStyle = '#999';
          } else {
            this.ctx.fillStyle = '#282828';
          }

          this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);

          if (this.renderImage === null) {
            this.ctx.fillStyle = '#FFF';
            this.ctx.textAlign = 'center';
            this.ctx.font = '20px Roboto';
            this.ctx.fillText(this.placeholderText,
              this.dimensions.width / 2, this.dimensions.height / 2);
          } else {
            const dx = (this.dimensions.width / 2) - (this.renderImage.width / 2);
            const dy = (this.dimensions.height / 2) - (this.renderImage.height / 2);

            this.ctx.drawImage(this.renderImage, dx, dy);
          }

          this.draw();
        });
      },
      setFullscreen(fullscreen) {
        this.fullscreen = fullscreen;
      },
      loadBlueprintImage() {
        axios
          .head(this.blueprint)
          .then(() => {
            const render = new Image();
            render.src = this.blueprint;
            render.onload = () => {
              this.renderImage = render;
            };
          })
          .catch(() => {});
      }
    },
    watch: {
      blueprint() {
        this.loadBlueprintImage();
      }
    }
  };
</script>

<style lang="scss" scoped>
  #animationWrapper {
    overflow: hidden;
  }
  #blueprintCanvasWrapper {
    height: calc(50vh - 80px);
    width: 100%;
    position: relative;
    overflow: hidden;

    // This is probably not an efficient way to do this
    transition: height 0.7s ease-in-out;

    #blueprintCanvas {
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      cursor: move;
    }

    .blueprint-controls {
      text-align: right;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      z-index: 2;

      .control-icon {
        cursor: pointer;
      }
    }

    &.fullscreen {
      height: calc(100vh - 80px);
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: inset 0 -50px 50px -50px #333;
      pointer-events: none;
    }
  }
</style>
