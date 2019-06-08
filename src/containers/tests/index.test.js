import React from "react";
import { shallow } from "enzyme";
import { Route } from "react-router-dom";

import AppContainer from "../index";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("<AppContainer />", () => {
  it("should render correctly", () => {
    const renderedComponent = AppContainer();
    expect(renderedComponent).not.toBe(null);
  });
});
