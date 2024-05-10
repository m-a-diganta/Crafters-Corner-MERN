import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Avatar from "../UIElements/Avatar";

const NavLinks = (props) => {
  // const auth = useContext(AuthContext);

  return (
    <ul>
      {Object.entries(props.paths).map(([name, path]) => (
        <li key={name}>
          {name == "Logout" ? (
            <Link to="/">
              <button onClick={path}>{name}</button>
            </Link>
          ) : name == "Image" && props.type === "NavBar" ? (
            <div className="avatar-image" onClick={props.onClick}>
              <Avatar image={path} width="2.5rem" alt="hello" />
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
