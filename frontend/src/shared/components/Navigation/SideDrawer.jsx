import React, { useContext } from "react";

import "./SideDrawer.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const SideDrawer = (props) => {
  const auth = useContext(AuthContext);

  return (
    <div
      className={`side-drawer__box ${props.status ? "active" : "inactive"} ${
        !auth.isLoggedIn && "logged-out"
      }`}
    >
      {props.children}
    </div>
  );
};

export default SideDrawer;
