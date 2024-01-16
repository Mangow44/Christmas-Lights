import { beforeEach, describe, expect, test, vi } from "vitest";
import LightService from "../LightService";
import Light from "../../models/Light";

describe("Light service", (): void => {
  let lightService: LightService;
  const lights: Light[][] = [
    [new Light({ x: 0, y: 0 }), new Light({ x: 0, y: 1 })],
    [new Light({ x: 1, y: 0 }), new Light({ x: 1, y: 1 })],
  ];

  beforeEach((): void => {
    vi.clearAllMocks();
    lightService = new LightService(lights);
  });

  test("Turn on lights", (): void => {
    // When
    lightService.turnOn({ x: 0, y: 0 }, { x: 1, y: 1 });

    // Then
    expect(lights[0][0].isLit).toBeTruthy();
    expect(lights[0][1].isLit).toBeTruthy();
    expect(lights[1][0].isLit).toBeTruthy();
    expect(lights[1][1].isLit).toBeTruthy();
  });

  test("Turn off lights", (): void => {
    // Given
    lightService.turnOn({ x: 0, y: 0 }, { x: 1, y: 1 });

    // When
    lightService.turnOff({ x: 0, y: 0 }, { x: 1, y: 1 });

    // Then
    expect(lights[0][0].isLit).toBeFalsy();
    expect(lights[0][1].isLit).toBeFalsy();
    expect(lights[1][0].isLit).toBeFalsy();
    expect(lights[1][1].isLit).toBeFalsy();
  });

  test("Toggle lights : on > off", (): void => {
    // Given
    lightService.turnOn({ x: 0, y: 0 }, { x: 1, y: 1 });

    // When
    lightService.toggle({ x: 0, y: 0 }, { x: 1, y: 1 });

    // Then
    expect(lights[0][0].isLit).toBeFalsy();
    expect(lights[0][1].isLit).toBeFalsy();
    expect(lights[1][0].isLit).toBeFalsy();
    expect(lights[1][1].isLit).toBeFalsy();
  });

  test("Toggle lights : off > on", (): void => {
    // Given
    lightService.turnOff({ x: 0, y: 0 }, { x: 1, y: 1 });

    // When
    lightService.toggle({ x: 0, y: 0 }, { x: 1, y: 1 });

    // Then
    expect(lights[0][0].isLit).toBeTruthy();
    expect(lights[0][1].isLit).toBeTruthy();
    expect(lights[1][0].isLit).toBeTruthy();
    expect(lights[1][1].isLit).toBeTruthy();
  });
});
