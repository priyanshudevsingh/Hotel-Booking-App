import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = () => {
  const RenderMenu = () => {
    return (
      <>
        <img src={logo} alt="logo" title="App Logo" width="250"></img>
        <div>
          <ul id="navbar">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/hotelListings">Hotels List</NavLink>
            </li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <>
      <nav>
        <RenderMenu />
      </nav>
    </>
  );
};

export default NavBar;
