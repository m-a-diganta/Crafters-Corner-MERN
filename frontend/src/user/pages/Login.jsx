import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Auth.css";
import Input from "../../shared/components/FormElements/Input";

const Login = () => {
  const [formContent, setFormContent] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <main className="center">
      <div className="auth-box login">
        <div className="login-signup-switch">
          <Link to="/login" className="primary active center">
            LOGIN
          </Link>
          <Link to="/signup" className="secondary inactive center">
            SIGNUP
          </Link>
        </div>

        <div className="form-box">
          <form onSubmit={loginSubmitHandler}>
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
            <button className="submit-button" type="submit">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
