import { beforeEach, describe, expect, test, vi } from "vitest";
import { VueWrapper, shallowMount } from "@vue/test-utils";
import ChristmasLightVue from "../ChristmasLight.vue";
import Light from "../../models/Light";

/**
 * @vitest-environment jsdom
 */

describe("Christmas light", (): void => {
  let wrapper: VueWrapper;
  const propsLight = new Light({ x: 0, y: 0 });

  beforeEach((): void => {
    vi.clearAllMocks();
    wrapper = shallowMount(ChristmasLightVue, { props: { light: propsLight } });
  });

  test("Init vue component with props", (): void => {
    // Given
    const dataTestLight: string = "light";

    // When
    const light = wrapper.find(`[data-testid="${dataTestLight}"]`);

    // Then
    expect(light.classes().includes("lit")).toBeFalsy();
  });
});
