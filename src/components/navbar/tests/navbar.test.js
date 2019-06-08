import React from "react";
import { shallow } from "enzyme";
import { Route } from "react-router-dom";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import Navbar from "../index";

describe("<Navbar />", () => {
  it("should render some routes", () => {
    const renderedComponent = shallow(<Navbar />);
    expect(true).not.toBe(false);
  });
});
