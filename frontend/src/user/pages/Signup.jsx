import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./Auth.css";
import Input from "../../shared/components/FormElements/Input";

const Signup = () => {
  const [formContent, setFormContent] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const signupSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <main className="center">
      <div className="login-box">
        <div className="login-signup-switch">
          <Link to="/login" className="primary inactive center">
            LOGIN
          </Link>
          <Link to="/signup" className="secondary active center">
            SIGNUP
          </Link>
        </div>

        <div className="form-box">
          <form onSubmit={signupSubmitHandler}>
            <Input
              element="input"
              id="username"
              type="username"
              label="Username"
              placeholder="John Doe"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="email"
              type="email"
              label="Email"
              placeholder="john@gmail.com"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              placeholder="********"
              onInput={inputHandler}
            />
            <button type="submit">LOGIN</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
