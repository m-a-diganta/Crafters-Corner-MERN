import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./MainNavigation.css";
import tempImage from "../../../assets/temp.png";
import defaultExpandImage from "../../../assets/expand-button.png";
import Avatar from "../UIElements/Avatar";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const sideDrawerRef = useRef();

  const loggedOutPaths = {};

  const sellerPaths = {};

  const customerPaths = {};

  const dropDownIcon = {
    Image: auth.isLoggedIn ? tempImage : defaultExpandImage,
  };

  let sideDrawerPaths = {
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
    navBarPaths = { ...navBarPaths, ...loggedOutPaths, ...dropDownIcon };
    sideDrawerPaths = {
      Signup: "/signup",
      Login: "/login",
    };
  } else if (auth.role === "customer") {
    navBarPaths = { ...navBarPaths, ...customerPaths, ...dropDownIcon };
  } else if (auth.role === "seller") {
    navBarPaths = { ...navBarPaths, ...sellerPaths, ...dropDownIcon };
  }

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
          <NavLinks
            paths={sideDrawerPaths}
            additionalPaths={navBarPaths}
            type="SideDrawer"
          />
        </SideDrawer>
      </div>
      <nav className="center">
        <div className="nav-links">
          <NavLinks
            paths={navBarPaths}
            type="NavBar"
            onClick={sideDrawerHandler}
          />
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
