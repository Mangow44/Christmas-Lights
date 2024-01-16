<script setup lang="ts">
import Light from "../models/Light";

defineProps<{ light: Light }>();
</script>

<template>
  <div
    data-testid="light"
    class="christmas_light"
    :class="[light.isLit ? 'lit' : '']"
  ></div>
</template>

<style scoped>
.christmas_light {
  width: 10px;
  height: 10px;

  background-color: gray;
}

.lit {
  background-color: yellow;
}
</style>
