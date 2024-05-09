import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./MainNavigation.css";

const MainNavigation = () => {
  const auth = useContext(AuthContext);

  return (
    <header className="nav-header">
      <h1 className="nav-title center">Crafters Corner</h1>
      <nav className="center">
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/check">Check</NavLink>
          </li>

          {auth.isLoggedIn && auth.role === "customer" && (
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
          )}
          {auth.isLoggedIn && auth.role === "seller" && (
            <li>
              <NavLink to="/store">Store</NavLink>
            </li>
          )}

          {!auth.isLoggedIn && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          {auth.isLoggedIn && (
            <li>
              <button onClick={auth.logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
