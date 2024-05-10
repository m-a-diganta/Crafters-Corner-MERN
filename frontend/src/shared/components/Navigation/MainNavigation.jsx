import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./MainNavigation.css";
import tempImage from "../../../assets/temp.png";
import Avatar from "../UIElements/Avatar";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const sideDrawerRef = useRef();

  const loggedOutPaths = {
    Login: "/login",
  };

  const sellerPaths = {
    Image: tempImage,
  };

  const customerPaths = {};

  const sideDrawerPaths = {
    Dashboard: "/dashboard",
    Settings: "/settings",
    Logout: auth.logout,
  };

  let navBarPaths = {
    Home: "/",
    Store: "/store",
    Services: "/services",
  };

  if (!auth.isLoggedIn) {
    navBarPaths = { ...navBarPaths, ...loggedOutPaths };
  } else if (auth.role === "customer") {
    navBarPaths = { ...navBarPaths, ...customerPaths };
  } else if (auth.role === "seller") {
    navBarPaths = { ...navBarPaths, ...sellerPaths };
  }

  console.log(navBarPaths);

  const sideDrawerHandler = (event) => {
    event.stopPropagation();
    setDrawerIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const closeSideDrawerHandler = (event) => {
      if (!sideDrawerRef.current.contains(event.target)) {
        setDrawerIsOpen(false);
      }
    };
    document.addEventListener("click", closeSideDrawerHandler);

    return () => {
      document.removeEventListener("click", closeSideDrawerHandler);
    };
  }, [drawerIsOpen]);

  return (
    <header className="nav-header">
      <h1 className="nav-title center">Crafters Corner</h1>
      <div onClick={sideDrawerHandler} ref={sideDrawerRef}>
        <SideDrawer status={drawerIsOpen}>
          <NavLinks paths={sideDrawerPaths} type="SideDrawer" />
        </SideDrawer>
      </div>
      <nav className="center">
        <div className="nav-links">
          <NavLinks
            paths={navBarPaths}
            type="NavBar"
            onClick={sideDrawerHandler}
          />
          {/* <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {!auth.isLoggedIn && (
              <li>
                <NavLink to="/check">Check</NavLink>
              </li>
            )}
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
                <div className="avatar-image" onClick={sideDrawerHandler}>
                  <Avatar image={tempImage} width="2.5rem" alt="hello" />
                </div>
              </li>
            )}
          </ul> */}
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
