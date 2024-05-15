import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Navbar from "./NavbarSection.vue";

describe("Navbar", () => {
  it("is a Vue instance of Navbar", () => {
    const navbarWrapper = mount(Navbar);
    expect(navbarWrapper.vm).toBeTruthy();
  });

  it("testing Name component props", () => {
    const nameOptions = ["Check Name", null];

    nameOptions.forEach((name: any) => {
      const nameWrapper = mount(Navbar, {
        props: {
          name,
        }
      });
      expect(nameWrapper.props("name")).toBe(name);
    });
  });

  it("testing Menus component props", () => {
    const menuOptions = ["Check Menus", null];

    menuOptions.forEach((menus: any) => {
      const menuWrapper = mount(Navbar, {
        props: {
          menus,
        }
      });
      expect(menuWrapper.props("menus")).toBe(menus);
    });
  });
});
