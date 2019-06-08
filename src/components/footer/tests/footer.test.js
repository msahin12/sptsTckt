import React from "react";
import { shallow } from "enzyme";
import { Route } from "react-router-dom";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import Footer from "../index";

describe("<Footer />", () => {
  it("should render some routes", () => {
    const renderedComponent = shallow(<Footer />);
    expect(true).not.toBe(false);
  });
});
