import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Auth.css";
import Input from "../../shared/components/FormElements/Input";
import { AuthContext } from "../../shared/context/auth-context";

const Login = () => {
  const auth = useContext(AuthContext);

  const [formContent, setFormContent] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = formContent;
      const registerData = {
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:5000/sellers/login",
        registerData
      );

      await auth.login();
      navigate("/store");
    } catch (err) {
      console.log(err);
    }
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
