<script setup lang="ts">
  import { onMounted } from 'vue';
  import { particleLine } from '../lib/index'

  onMounted(() => {
    particleLine({
      id: 'canvas',
      color: '255, 0, 0',
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
  background-color: #ffffff;
  z-index: -1;
}
</style>
