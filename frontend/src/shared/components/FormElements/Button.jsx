import React from "react";

import "./Button.css";

const Button = (props) => {
  return (
    <button
      className="button"
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
};

export default Button;
