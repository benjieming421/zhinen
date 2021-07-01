<template>
  <div class="particles-container">
    <vue-particles
      :color="dotColor"
      :particleOpacity="particleOpacity"
      :particlesNumber="particlesNumber"
      :shapeType="shapeType"
      :particleSize="particleSize"
      :linesColor="lineColor"
      :linesWidth="linesWidth"
      :lineLinked="lineLinked"
      :lineOpacity="lineOpacity"
      :linesDistance="linesDistance"
      :moveSpeed="moveSpeed"
      :hoverEffect="hoverEffect"
      :hoverMode="hoverMode"
      :clickEffect="clickEffect"
      :clickMode="clickMode"
      class="vue-particles"
      :style="{ background: 'url(' + bgImage + ') 0% 0% / cover no-repeat' }"
    >
    </vue-particles>
    <div class="slot-container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Particles",
  props: {
    bgImage: {
      type: String,
      required: true
    },
    dotColor: {
      type: String,
      default() {
        return "#5cbdaa";
      }
    },
    lineColor: {
      type: String,
      default() {
        return "#5cbdaa";
      }
    },
    particleOpacity: {
      type: Number,
      default() {
        return 0.7;
      }
    },
    particlesNumber: {
      type: Number,
      default() {
        return 100;
      }
    },
    shapeType: {
      type: String,
      defualt() {
        return "circle";
      }
    },
    particleSize: {
      type: Number,
      default() {
        return 5;
      }
    },
    linesWidth: {
      type: Number,
      default() {
        return 1;
      }
    },
    lineLinked: {
      type: Boolean,
      default() {
        return true;
      }
    },
    lineOpacity: {
      type: Number,
      default() {
        return 1;
      }
    },
    linesDistance: {
      type: Number,
      default() {
        return 150;
      }
    },
    moveSpeed: {
      type: Number,
      default() {
        return 2;
      }
    },
    hoverEffect: {
      type: Boolean,
      default() {
        return true;
      }
    },
    hoverMode: {
      type: String,
      default() {
        return "grab";
      }
    },
    clickEffect: {
      type: Boolean,
      default() {
        return true;
      }
    },
    clickMode: {
      type: String,
      default() {
        return "push";
      }
    }
  }
};
</script>

<style scoped>
.particles-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.vue-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}
.slot-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 360px;
  height: 500px;
}
</style>
