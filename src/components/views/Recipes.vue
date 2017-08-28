<template>
  <div>
    <section id="heading">
      <container>
        <h1>{{ $t('navbar.menu.tools.recipe_tree') }}</h1>
      </container>
    </section>
    <section>
      <loader v-if="loading"></loader>
      <container v-if="!loading">
        <md-layout :md-gutter="8">
          <md-layout md-flex-xsmall="50" md-flex-small="33" md-flex="25">
            <md-input-container>
              <label for="item">Item</label>
              <md-select name="item" id="item" v-model="selectedRecipe">
                <md-option v-for="i in sortedItems" :key="i" :value="items[i].name">{{ language[items[i].name] || items[i].name }}</md-option>
              </md-select>
            </md-input-container>
          </md-layout>
          <md-layout md-flex-xsmall="50" md-flex-small="33" md-flex="25">
            <md-input-container>
              <label>Amount</label>
              <md-input v-model="amount"></md-input>
            </md-input-container>
          </md-layout>
        </md-layout>
        <div style="width: 100%" id="svgparent">
          <svg style="width: 100%" id="svg"></svg>
        </div>
        <div id="tooltip" style="opacity: 0;"></div>
      </container>
    </section>
  </div>
</template>

<script>
  /* eslint-disable */

  import Hammer from 'hammerjs';
  import axios from 'axios';
  import pluralize from 'pluralize';
  import svgPanZoom from 'svg-pan-zoom';
  import * as d3 from "d3";
  import Container from '../partials/Container';
  import TextInput from '../partials/TextInput';
  import Loader from '../partials/Loader';
  import { loadData, resolveRecipeTree } from '../../tools/recipes.ts';

  export default {
    name: 'recipes-view',
    components: {
      Container,
      TextInput,
      Loader
    },
    data() {
      return {
        expensive: false,
        loading: true,
        selectedRecipe: null,
        items: [],
        sortedItems: [],
        amount: 1,
        panZoom: null
      };
    },
    watch: {
      selectedRecipe () {
        this.update(resolveRecipeTree(this.selectedRecipe, this.amount));
        this.updateRoute();
      },
      amount () {
        this.update(resolveRecipeTree(this.selectedRecipe, this.amount));
        this.updateRoute();
      }
    },
    mounted() {
      Promise.all([
        axios
          .get('/static/tools/factorio-data.json')
          .then((response) => {
            this.items = response.data.items;
            this.sortedItems = Object.keys(this.items);
            this.sortedItems.sort();
            loadData(response.data);
          }),
        axios
          .get('/static/tools/factorio-lang.json')
          .then((response) => {
            this.language = response.data;
          })
      ])
        .then(() => {
          this.loading = false;
          this.$nextTick(function() {
            this.selectedRecipe = this.$route.params.recipe;
            this.amount = this.$route.params.amount || 1;
          })
        })
    },
    methods: {
      updateRoute() {
        if (this.$route.name === 'tools/recipes') {
          this.$router.replace({ name: 'tools/recipes', params: { recipe: this.selectedRecipe, amount: this.amount } });
        } else {
          this.$router.push({ name: 'tools/recipes', params: { recipe: this.selectedRecipe, amount: this.amount } });
        }
      },
      /**
       * @param {RecipeTree} data
       */
      update(data) {
        if(this.panZoom !== null){
          this.panZoom.destroy();
          this.panZoom = null;
        }

        var self = this;

        let maxTreeWidth = Math.max(...Object.values(data.width(0, {})));

        var svg = d3.select("svg");
        svg.attr("height", Math.max(maxTreeWidth, 5) * 90);

        d3.select("#svgparent").attr("style", "width: 100%; height:" + svg.attr("height") + "px");

        svg.selectAll("*").remove();

        var tooltip = d3.select("#tooltip");

        var margin = {top: 20, right: 120, bottom: 20, left: 180},
          width = svg.node().getBoundingClientRect().width,
          height = svg.attr("height") - margin.top - margin.bottom;

        svg.attr("viewBox", "0 0 " + width + " " + svg.attr("height"));

        var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var tree = d3.cluster()
          .size([height, width - 160]);

        var root = d3.hierarchy(data.toChartTree());
        tree(root);

        var link = g.selectAll(".link")
          .data(root.descendants().slice(1))
          .enter().append("path")
          .attr("class", function (d) {
            let classes = "link";

            if(d.data.item) {
              if (d.data.amount < 14) {
                classes += " link-yellow"
              } else if (d.data.amount < 27) {
                classes += " link-red"
              } else if (d.data.amount < 41) {
                classes += " link-blue"
              } else {
                classes += " link-blue link-bold"
              }
            }

            return classes;
          })
          .attr("d", function(d) {
            return "M" + (d.depth * 180) + "," + d.x
              + "C" + (d.parent.depth * 180 + 100) + "," + d.x
              + " " + (d.parent.depth * 180 + 100) + "," + d.parent.x
              + " " + (d.parent.depth * 180) + "," + d.parent.x;
          })
          .on("mouseover", function(d) {
            let html = "Moving " + d.data.amount + "/s<br>Requires:<br>";

            if(d.data.item) {
              Object.keys(d.data.moveSpeeds).sort((a, b) => {
                return d.data.moveSpeeds[a] - d.data.moveSpeeds[b]
              }).forEach((belt) => {
                html += pluralize.plural(self.language[belt]) + ": " + d.data.moveSpeeds[belt] + "<br>"
              });
            }

            tooltip.transition()
              .duration(200)
              .style("opacity", .9);
            tooltip.html(html)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function() {
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          });

        var node = g.selectAll(".node")
          .data(root.descendants())
          .enter().append("g")
          .attr("class", function(d) {
            return "node" + (d.children ? " node--internal" : " node--leaf");
          })
          .attr("transform", function(d) {
            return "translate(" + (d.depth * 180) + "," + d.x + ")";
          })
          .on("mouseover", function(d) {
            let html = "Creating " + d.data.amount + "/s<br>Requires:<br>";

            Object.keys(d.data.craftSpeeds).sort((a, b) => {
              return d.data.craftSpeeds[a] - d.data.craftSpeeds[b]
            }).forEach((machine) => {
              let name = self.language[machine];

              const matches = name.match(/\d+$/);
              if (matches) {
                const number = matches[0];
                name = pluralize.plural(name.substring(0, name.length - 2)) + " " + number;
              }else{
                name = pluralize.plural(name)
              }

              html += name + ": " + d.data.craftSpeeds[machine] + "<br>"
            });

            tooltip.transition()
              .duration(200)
              .style("opacity", .9);
            tooltip.html(html)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          });

        node.append("circle")
          .attr("r", 7);

        node.append("text")
          .attr("dy", 3)
          .attr("x", function(d) { return d.children ? -8 : 8; })
          .style("text-anchor", "middle")
          .style("transform", function (d) {return d.children ? "translate(6px, -15px)" : "translate(-6px, -15px)";})
          .text(function(d) {
            return self.language[d.data.name];
          });

        node.append("text")
          .attr("dy", 3)
          .attr("x", function(d) { return d.children ? -8 : 8; })
          .style("text-anchor", "middle")
          .style("transform", function (d) {return d.children ? "translate(6px, 17px)" : "translate(-6px, 17px)";})
          .text(function(d) {
            let text = d.data.amount;

            if(d.data.name !== d.data.cause){
              text += " " + self.language[d.data.cause];
            }

            return text + "/s";
          });

        this.panZoom = svgPanZoom('#svg', {
          preventMouseEventsDefault: true,
          contain: true,
          dblClickZoomEnabled: true,
          zoomEnabled: true,
          maxZoom: 3,
          customEventsHandler: {
            haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
            init: function(options){
              let instance = options.instance,
                initialScale = 1,
                pannedX = 0,
                pannedY = 0;

              this.hammer = Hammer(options.svgElement);

              this.hammer.get('pinch').set({enable: true});

              this.hammer.on('doubletap', function(ev){
                instance.zoomIn()
              });

              this.hammer.on('panstart panmove touchstart touchmove', function(ev){
                if (ev.type === 'panstart' || ev.type === 'touchstart') {
                  pannedX = 0;
                  pannedY = 0;
                }

                instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY});

                pannedX = ev.deltaX;
                pannedY = ev.deltaY;
              });

              this.hammer.on('pinchstart pinchmove', function(ev){
                if (ev.type === 'pinchstart') {
                  initialScale = instance.getZoom();
                  instance.zoom(initialScale * ev.scale);
                }

                instance.zoom(initialScale * ev.scale);
              });

              options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
            }
            , destroy: function(options){
              this.hammer.destroy()
            }
          }
        });

        this.panZoom.resize();
        this.panZoom.fit();
        this.panZoom.enablePan();

        window.myPanZoom = this.panZoom;

        const tempSvg = document.getElementById("svg");
        const tempG = tempSvg.firstElementChild;
        this.panZoom.zoom(Math.min(Math.min(width / tempG.getBBox().width, height / tempG.getBBox().height), 1));

        if(window.width <= 768) {
          this.panZoom.pan({
            x: tempSvg.getBoundingClientRect().left - tempG.getBoundingClientRect().left,
            y: tempSvg.getBoundingClientRect().top - tempG.getBoundingClientRect().top,
          })
        }else{
          this.panZoom.pan({
            x: -53,
            y: 0,
          })
        }
      }
    }
  };
</script>

<style lang="scss">
  .node circle {
    fill: #fff;
    stroke: steelblue;
    stroke-width: 3px;
  }

  .node text {
    font: 14px sans-serif;
    fill: #ffffff;
    text-shadow: 1px 1px 5px black;
  }

  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 3px;

    &.link-yellow {
      stroke: #efe9a1;
    }

    &.link-red {
      stroke: #efa1a1;
    }

    &.link-blue {
      stroke: #a1c7ef;
    }

    &.link-bold {
      stroke-width: 6px;
    }
  }

  #tooltip {
    position: absolute;
    text-align: left;
    width: 200px;
    height: 85px;
    padding: 6px;
    font: 12px sans-serif;
    background: #222;
    border: 2px solid #555;
    opacity: 0.8;
    pointer-events: none;
  }

  svg {
    transition: box-shadow 0.1s, background-color 0.1s;
  }

  svg:hover {
    box-shadow: 0 0 16px 3px #888888;
    background-color: #464646;
  }
</style>
