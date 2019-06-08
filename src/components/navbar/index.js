/**
 * Summary.
 *
 * The Navbar Component
 */

import React from "react";
import "./navbar.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const Navbar = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <img
          src="/images/logo.jpg"
          alt="toki"
          style={{
            width: "30px",
            marginRight: "10px"
          }}
        />
        <h2>SPORTS</h2>
        <h3>Tickets</h3>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
