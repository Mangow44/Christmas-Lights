import { describe, beforeEach, vi, test, expect } from "vitest";
import Light from "../Light";
import Coordinates from "../Coordinates";

describe("Light", (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  test("Light's inital values", (): void => {
    // Given
    const initalCoordinates: Coordinates = { x: 0, y: 0 };
    const light = new Light(initalCoordinates);

    // When
    const isLit: boolean = light.isLit;
    const coordinates: Coordinates = light.coordinates;

    // Then
    expect(isLit).toBeFalsy();
    expect(coordinates).toEqual(initalCoordinates);
  });

  test("Turn on light", (): void => {
    // Given
    const light: Light = lightWith();

    // When
    light.turnOn();

    // Then
    expect(light.isLit).toBeTruthy();
  });

  test("Turn off light", (): void => {
    // Given
    const light: Light = lightWith();
    light.turnOn();

    // When
    light.turnOff();

    // Then
    expect(light.isLit).toBeFalsy();
  });

  test("Toggle light : on > off", (): void => {
    // Given
    const light: Light = lightWith();
    light.turnOn();

    // When
    light.toggle();

    // Then
    expect(light.isLit).toBeFalsy();
  });

  test("Toggle light : off > on", (): void => {
    // Given
    const light: Light = lightWith();

    // When
    light.toggle();

    // Then
    expect(light.isLit).toBeTruthy();
  });

  function lightWith(coordinates: Coordinates = { x: 0, y: 0 }): Light {
    return new Light(coordinates);
  }
});
