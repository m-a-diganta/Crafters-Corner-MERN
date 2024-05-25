import React, { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../context/auth-context";
import defaultExpandImage from "../../../assets/expand-button.png";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";
import { Link, NavLink } from "react-router-dom";

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const sideDrawerRef = useRef();

  const loggedOutPaths = {};

  const sellerPaths = {};

  const customerPaths = {};

  const dropDownIcon = {
    Image: auth.isLoggedIn
      ? `${import.meta.env.VITE_REACT_APP_ASSET_URL}/${auth.userImage}`
      : defaultExpandImage,
  };

  let sideDrawerPaths = {
    Dashboard: "/seller/dashboard",
    Settings: "/settings",
    Logout: auth.logout,
  };

  let navBarPaths = {
    Home: "/",
    Group: "/group",
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
      <NavLink to="/" className="nav-title center">
        Crafters Corner
      </NavLink>
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
