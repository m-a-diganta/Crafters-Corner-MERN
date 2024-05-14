import React from "react";

import "./Button.css";

const Button = (props) => {
  const element =
    props.element === "text" ? (
      <button
        className="button-text"
        onClick={props.onClick}
        type={props.type}
        style={{
          width: props.width || "100%",
          height: props.height || "3rem",
        }}
      >
        {props.children}
      </button>
    ) : (
      <button
        className="button-box"
        type={props.type}
        style={{
          width: props.width || "100%",
          height: props.height || "3rem",
          borderRadius: props.radius || "10px",
        }}
      >
        {props.children}
      </button>
    );

  return <>{element}</>;
};

export default Button;
