import Coordinates from "../models/Coordinates";
import Light from "../models/Light";

export default class LightService {
  private _lights: Light[][];

  constructor(lights: Light[][]) {
    this._lights = lights;
  }

  turnOn(firstCoordinates: Coordinates, secondCoordinates: Coordinates): void {
    this.performOperation(
      firstCoordinates,
      secondCoordinates,
      (light): void => {
        light.turnOn();
      }
    );
  }

  turnOff(firstCoordinates: Coordinates, secondCoordinates: Coordinates): void {
    this.performOperation(
      firstCoordinates,
      secondCoordinates,
      (light): void => {
        light.turnOff();
      }
    );
  }

  toggle(firstCoordinates: Coordinates, secondCoordinates: Coordinates): void {
    this.performOperation(
      firstCoordinates,
      secondCoordinates,
      (light): void => {
        light.toggle();
      }
    );
  }

  private performOperation(
    firstCoordinates: Coordinates,
    secondCoordinates: Coordinates,
    operation: (light: Light) => void
  ): void {
    let [firstCoordinatesX, secondCoordinatesX] = [
      firstCoordinates.x,
      secondCoordinates.x,
    ].sort((a, b) => a - b);
    let [firstCoordinatesY, secondCoordinatesY] = [
      firstCoordinates.y,
      secondCoordinates.y,
    ].sort((a, b) => a - b);

    for (let i = firstCoordinatesX; i <= secondCoordinatesX; i++) {
      for (let j = firstCoordinatesY; j <= secondCoordinatesY; j++) {
        try {
          operation(this._lights[i][j]);
        } catch {
          throw new Error(`Light at coordinates (${i}, ${j}) is undefined.`);
        }
      }
    }
  }
}
