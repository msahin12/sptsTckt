import React from "react";
import { shallow } from "enzyme";

import {fetchEvents} from "../fetchEvents";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";


describe("fetchEvents fn", () => {
  it("should fetch Events correctly", () => {
    const result = fetchEvents();
    expect(result).not.toBe(null);
  });
});

