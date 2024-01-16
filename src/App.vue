<script setup lang="ts">
import { ref } from "vue";
import ChristmasLight from "./components/ChristmasLight.vue";
import Light from "./models/Light";
import LightService from "./services/LightService";
import lights from "./utils/lights";

const christmasLights = ref<Light[][]>(lights);
const firstCoordinatesX = ref<number>(0);
const firstCoordinatesY = ref<number>(0);
const secondCoordinatesX = ref<number>(0);
const secondCoordinatesY = ref<number>(0);
const errorMessage = ref<string>("");

const lightService = new LightService(christmasLights.value as Light[][]);

function handleClick(operation: () => void): void {
  try {
    operation();
    errorMessage.value = "";
  } catch (e: any) {
    errorMessage.value = e.message;
  }
}
</script>

<template>
  <h1>Christmas Lights</h1>

  <div>
    <span>Premières coordonnées : </span>

    <label for="firstCoordinatesX">X : </label>
    <input
      data-testid="input_firstCoordinatesX"
      id="firstCoordinatesX"
      type="number"
      min="0"
      max="29"
      v-model="firstCoordinatesX"
    />

    <label for="firstCoordinatesY">Y : </label>
    <input
      data-testid="input_firstCoordinatesY"
      id="firstCoordinatesY"
      type="number"
      min="0"
      max="29"
      v-model="firstCoordinatesY"
    />
  </div>

  <div>
    <span>secondes coordonnées : </span>

    <label for="secondCoordinatesX">X : </label>
    <input
      data-testid="input_secondCoordinatesX"
      id="secondCoordinatesX"
      type="number"
      min="0"
      max="29"
      v-model="secondCoordinatesX"
    />

    <label for="secondCoordinatesY">Y : </label>
    <input
      data-testid="input_secondCoordinatesY"
      id="secondCoordinatesY"
      type="number"
      min="0"
      max="29"
      v-model="secondCoordinatesY"
    />
  </div>

  <div>
    <button
      data-testid="button_toggle"
      :onclick="():void => {handleClick((): void => lightService.toggle({x: firstCoordinatesX, y:firstCoordinatesY}, {x: secondCoordinatesX, y:secondCoordinatesY}))}"
    >
      Toggle
    </button>

    <button
      data-testid="button_turnOn"
      :onclick="():void => { handleClick((): void => lightService.turnOn( {x: firstCoordinatesX, y:firstCoordinatesY}, {x: secondCoordinatesX, y:secondCoordinatesY}))}"
    >
      Turn on
    </button>

    <button
      data-testid="button_turnOff"
      :onclick="():void => { handleClick((): void => lightService.turnOff({x: firstCoordinatesX, y:firstCoordinatesY}, {x: secondCoordinatesX, y:secondCoordinatesY}))}"
    >
      Turn off
    </button>
  </div>

  <span data-testid="error_message" class="error">
    {{ errorMessage }}
  </span>

  <div class="wall">
    <template v-for="lights in christmasLights">
      <ChristmasLight v-for="light in lights" :light="(light as Light)" />
    </template>
  </div>
</template>

<style scoped>
.wall {
  display: flex;
  flex-wrap: wrap;

  width: 300px;
}

.error {
  color: red;
}
</style>
