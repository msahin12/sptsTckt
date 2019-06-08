import React from "react";
import "./main.scss";
import Events from "./events";

const Main = () => {
  return (
    <div className="main-section">
      <div className="main-heading">Best Tickets...</div>
      <Events />
    </div>
  );
};

export default Main;
