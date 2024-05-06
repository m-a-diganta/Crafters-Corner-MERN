import React, { useEffect, useState } from "react";

import "./Input.css";

const Input = (props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    props.onInput(props.id, value);
  }, [props.id, value]);
  return (
    <div className="form-input">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={(e) => setValue(e.target.value)}
        placeholder={props.placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
