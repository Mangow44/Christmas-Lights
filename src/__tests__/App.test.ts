import { VueWrapper, shallowMount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";
import AppVue from "../App.vue";
import LightService from "../services/LightService";

/**
 * @vitest-environment jsdom
 */

describe("App", (): void => {
  let wrapper: VueWrapper;
  const dataTestInputSecondCoordinatesX: string = "input_secondCoordinatesX";
  const dataTestInputSecondCoordinatesY: string = "input_secondCoordinatesY";
  const dataTestButtonToggle: string = "button_toggle";
  const dataTestButtonTurnOn: string = "button_turnOn";
  const dataTestButtonTurnOff: string = "button_turnOff";
  const dataErrorMessage: string = "error_message";

  beforeEach((): void => {
    vi.clearAllMocks();
    wrapper = shallowMount(AppVue);
  });

  test("Toggle lights", async (): Promise<void> => {
    // Given
    const inputSecondCoordinatesX = wrapper.find(
      `[data-testid="${dataTestInputSecondCoordinatesX}"]`
    );
    const inputSecondCoordinatesY = wrapper.find(
      `[data-testid="${dataTestInputSecondCoordinatesY}"]`
    );
    const buttonToggle = wrapper.find(
      `[data-testid="${dataTestButtonToggle}"]`
    );
    const toggleSpy = vi.spyOn(LightService.prototype, "toggle");

    // When
    inputSecondCoordinatesX.setValue(3);
    inputSecondCoordinatesY.setValue(3);

    await wrapper.vm.$nextTick();

    await buttonToggle.trigger("click");

    // Then
    expect(toggleSpy).toHaveBeenCalledWith({ x: 0, y: 0 }, { x: 3, y: 3 });
  });

  test("Turn on lights", async (): Promise<void> => {
    // Given
    const inputSecondCoordinatesX = wrapper.find(
      `[data-testid="${dataTestInputSecondCoordinatesX}"]`
    );
    const inputSecondCoordinatesY = wrapper.find(
      `[data-testid="${dataTestInputSecondCoordinatesY}"]`
    );
    const buttonTurnOn = wrapper.find(
      `[data-testid="${dataTestButtonTurnOn}"]`
    );
    const turnOnSpy = vi.spyOn(LightService.prototype, "turnOn");

    // When
    inputSecondCoordinatesX.setValue(3);
    inputSecondCoordinatesY.setValue(3);

    await wrapper.vm.$nextTick();

    await buttonTurnOn.trigger("click");

    // Then
    expect(turnOnSpy).toHaveBeenCalledWith({ x: 0, y: 0 }, { x: 3, y: 3 });
  });

  test("Turn off lights", async (): Promise<void> => {
    // Given
    const inputSecondCoordinatesX = wrapper.find(
      `[data-testid="${dataTestInputSecondCoordinatesX}"]`
    );
    const inputSecondCoordinatesY = wrapper.find(
      `[data-testid="${dataTestInputSecondCoordinatesY}"]`
    );
    const buttonTurnOff = wrapper.find(
      `[data-testid="${dataTestButtonTurnOff}"]`
    );
    const turnOffSpy = vi.spyOn(LightService.prototype, "turnOff");

    // When
    inputSecondCoordinatesX.setValue(3);
    inputSecondCoordinatesY.setValue(3);

    await wrapper.vm.$nextTick();

    await buttonTurnOff.trigger("click");

    // Then
    expect(turnOffSpy).toHaveBeenCalledWith({ x: 0, y: 0 }, { x: 3, y: 3 });
  });

  test.each([
    [-1, 0],
    [0, -1],
    [30, 0],
    [0, 30],
  ])(
    "Show error with coordinates (%i, %i) > out of bounds",
    async (x: number, y: number): Promise<void> => {
      // Given
      const inputSecondCoordinatesX = wrapper.find(
        `[data-testid="${dataTestInputSecondCoordinatesX}"]`
      );
      const inputSecondCoordinatesY = wrapper.find(
        `[data-testid="${dataTestInputSecondCoordinatesY}"]`
      );
      const buttonTurnOn = wrapper.find(
        `[data-testid="${dataTestButtonTurnOn}"]`
      );
      const errorMessage = wrapper.find(`[data-testid="${dataErrorMessage}"]`);

      // When
      inputSecondCoordinatesX.setValue(x);
      inputSecondCoordinatesY.setValue(y);

      await wrapper.vm.$nextTick();

      await buttonTurnOn.trigger("click");

      // Then
      expect(errorMessage.text()).toEqual(
        `Light at coordinates (${x}, ${y}) is undefined.`
      );
    }
  );
});
