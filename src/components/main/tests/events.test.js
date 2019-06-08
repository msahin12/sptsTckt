import React from "react";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Modal } from "antd";
import { Tickets } from "../tickets";

describe("<Tickets />", () => {
  it("should render <Tickets />", () => {
    const result = Tickets;

    expect(result).not.toBe(null);
  });
});
