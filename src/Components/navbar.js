import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

// Navigation bar component
const NavBar = () => {
  // RenderMenu component - responsible for rendering the menu items
  const RenderMenu = () => {
    return (
      <>
        {/* Logo of the application */}
        <img src={logo} alt="logo" title="App Logo" width="200"></img>

        {/* Navigation menu */}
        <div>
          <ul id="navbar">
            {/* Home link */}
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            {/* Hotels List link */}
            <li>
              <NavLink to="/hotel_listings">Hotels List</NavLink>
            </li>
          </ul>
        </div>
      </>
    );
  };

  // Render the navigation bar with the menu
  return (
    <>
      <nav>
        <RenderMenu />
      </nav>
    </>
  );
};

export default NavBar;
