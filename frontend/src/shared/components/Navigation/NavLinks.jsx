import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Avatar from "../UIElements/Avatar";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul>
      {props.additionalPaths &&
        Object.entries(props.additionalPaths).map(
          ([name, path]) =>
            name !== "Image" && (
              <li key={name} className="additional-paths">
                <NavLink to={path}>{name}</NavLink>
              </li>
            )
        )}

      {Object.entries(props.paths).map(([name, path]) => (
        <li key={name}>
          {name == "Logout" ? (
            <Link to="/">
              <button onClick={path}>{name}</button>
            </Link>
          ) : name == "Image" && props.type === "NavBar" ? (
            <div
              className={`avatar-image ${
                auth.isLoggedIn ? "logged-in" : "logged-out"
              }`}
              onClick={props.onClick}
            >
              <Avatar
                image={path}
                width={auth.isLoggedIn ? "2.5rem" : "1.5rem"}
                alt="hello"
              />
            </div>
          ) : (
            <NavLink to={path}>{name}</NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
