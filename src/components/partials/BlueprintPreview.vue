<template>
  <div id="blueprintCanvasWrapper" :class="{ fullscreen: fullscreen }">
    <canvas id="blueprintCanvas"></canvas>
    <div class="blueprint-controls">
      <div v-if="fullscreen">
        <md-icon class="control-icon" @click="setFullscreen(false)">fullscreen_exit</md-icon>
      </div>
      <div v-else>
        <icon class="control-icon" @click="setFullscreen(true)" onclick="alert('hi')">fullscreen</icon>
      </div>
    </div>
  </div>
</template>

<script>
  import Container from './Container';

  export default {
    name: 'blueprint-preview',
    components: {
      Container
    },
    props: ['blueprint'],
    data() {
      return {
        dimensions: {
          width: 0,
          height: 0
        },
        parent: null,
        canvas: null,
        ctx: null,
        placeholderText: 'This will eventually render the Factorio blueprint.',
        fullscreen: false
      };
    },
    mounted() {
      this.parent = document.getElementById('blueprintCanvasWrapper');
      this.canvas = document.getElementById('blueprintCanvas');
      this.ctx = this.canvas.getContext('2d');

      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      this.handleResize();
      window.addEventListener('resize', this.handleResize);

      this.draw();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        this.canvas.width = this.dimensions.width = this.parent.offsetWidth;
        this.canvas.height = this.dimensions.height = this.parent.offsetHeight;

        this.canvas.style.width = `${this.parent.offsetWidth}px`;
        this.canvas.style.height = `${this.parent.offsetHeight}px`;

        if (window.devicePixelRatio > 1) {
          this.canvas.width *= window.devicePixelRatio;
          this.canvas.height *= window.devicePixelRatio;

          this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
      },
      draw() {
        requestAnimationFrame(() => {
          this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);

          this.ctx.fillStyle = '#999';
          this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);

          this.ctx.fillStyle = '#FFF';
          this.ctx.textAlign = 'center';
          this.ctx.font = '20px Roboto';
          this.ctx.fillText(this.placeholderText,
            this.dimensions.width / 2, this.dimensions.height / 2);

          this.draw();
        });
      },
      setFullscreen(fullscreen) {
        // TODO animate resizing

        this.fullscreen = fullscreen;

        // Wait one frame before resizing canvas
        requestAnimationFrame(() => {
          this.handleResize();
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  #blueprintCanvasWrapper {
    height: calc(50vh - 80px);
    position: relative;

    #blueprintCanvas {
      display: block;
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
