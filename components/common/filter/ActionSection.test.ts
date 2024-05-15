import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Action from "./ActionSection.vue";

describe("Action", () => {
  it("is a Vue instance of Action", () => {
    const actionWrapper = mount(Action);
    expect(actionWrapper.vm).toBeTruthy();
  });

  it("testing Genres component props", () => {
    const genreOption = ['Adventure',
      'Animation', 
      'Comedy', 
      'Crime', 
      'Documentary', 
      'Drama', 
      'Family', 
      'Fantasy', 
      'History', 
      'Horror', 
      'Music', 
      'Mystery', 
      'Romance', 
      'Science Fiction', 
      'TV Movie', 
      'Thriller', 
      'War', 
      'Western',
    ]
    genreOption.forEach((genres: any) => {
      const genreWrapper = mount(Action, {
        props: {
          genres,
        },
      });
      expect(genreWrapper.props("genres")).toBe(genres);
    });
  });
});
