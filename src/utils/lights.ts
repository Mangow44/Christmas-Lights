import Light from "../models/Light";

let lights: Light[][] = [];

for (let i = 0; i < 30; i++) {
  lights[i] = [];
  for (let j = 0; j < 30; j++) {
    lights[i][j] = new Light({ x: i, y: j });
  }
}

export default lights;
