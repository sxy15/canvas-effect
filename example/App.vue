<script setup lang="ts">
  import { onMounted } from 'vue';
  import { particleLine } from '../lib/particle-line'


  onMounted(() => {
    particleLine({
      id: 'canvas',
      count: 200
    })
  });
</script>

<template>
  <canvas id="canvas"></canvas>
</template>

<style scoped>
#canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: -1;
}
</style>
