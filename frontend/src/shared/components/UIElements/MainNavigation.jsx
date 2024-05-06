import React from "react";
import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <header className="nav-header">
      <h1 className="nav-title center">Crafters Corner</h1>
      <nav className="center">
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/store">Store</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
