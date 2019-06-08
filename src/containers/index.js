/**
 * Summary.
 *
 * This file is the container for main components.
 */

 import React from "react";

import Navbar from "../components/navbar";
import Main from "../components/main";
import Footer from "../components/footer";
function AppContainer() {
  return (
    <div className="AppContainer">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default AppContainer;
