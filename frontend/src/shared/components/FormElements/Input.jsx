import React, { useEffect, useState } from "react";

import "./Input.css";

const Input = (props) => {
  const [value, setValue] = useState(props.options ? props.options[0] : "");

  const element = {
    input: (
      <input
        type={props.type}
        id={props.id}
        onChange={(e) => setValue(e.target.value)}
        placeholder={props.placeholder}
        value={value}
      />
    ),

    textarea: (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    ),

    select: (
      <select
        name={props.id}
        id={props.id}
        onChange={(e) => setValue(e.target.value)}
      >
        {props.options &&
          props.options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
      </select>
    ),
  };

  useEffect(() => {
    props.onInput(props.id, value);
  }, [props.id, value]);
  return (
    <div className="form-input" style={{ width: props.width || "100%" }}>
      <label htmlFor={props.id}>{props.label}</label>
      {element[props.element]}
    </div>
  );
};

export default Input;
