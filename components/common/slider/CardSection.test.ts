import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Card from "./CardSection.vue";

describe("Card", () => {
  it("is a Vue instance of Card", () => {
    const cardWrapper = mount(Card);
    expect(cardWrapper.vm).toBeTruthy();
  });

  it("testing Title component props", () => {
    const titleOptions = ["Check Title", null];

    titleOptions.forEach((title: any) => {
      const titleWrapper = mount(Card, {
        props: {
          title,
        },
      });
      expect(titleWrapper.props("title")).toBe(title);
    });
  });

  it("testing ID component props", () => {
    const idOptions = ["Check Id", null];

    idOptions.forEach((id: any) => {
      const idWrapper = mount(Card, {
        props: {
          id,
        },
      });
      expect(idWrapper.props("id")).toBe(id);
    });
  });

  it("testing Name component props", () => {
    const nameOptions = ["Check Name", null];

    nameOptions.forEach((name: any) => {
      const nameWrapper = mount(Card, {
        props: {
          name,
        },
      });
      expect(nameWrapper.props("name")).toBe(name);
    });
  });

  it("testing Image component props", () => {
    const imageOptions = ["Check Image", null];

    imageOptions.forEach((image: any) => {
      const imageWrapper = mount(Card, {
        props: {
          image,
        },
      });
      expect(imageWrapper.props("image")).toBe(image);
    });
  });

  it("testing Character component props", () => {
    const characterOptions = ["Check Character", null];

    characterOptions.forEach((character: any) => {
      const characterWrapper = mount(Card, {
        props: {
          character,
        },
      });
      expect(characterWrapper.props("character")).toBe(character);
    });
  });
});
