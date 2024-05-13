import React, { useEffect, useState } from "react";

import "./Input.css";

const Input = (props) => {
  const [value, setValue] = useState("");

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        id={props.id}
        onChange={(e) => setValue(e.target.value)}
        placeholder={props.placeholder}
        value={value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    );

  useEffect(() => {
    props.onInput(props.id, value);
  }, [props.id, value]);
  return (
    <div className="form-input">
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
