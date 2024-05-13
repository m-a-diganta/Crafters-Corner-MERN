import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Auth.css";
import Input from "../../shared/components/FormElements/Input";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";

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
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/sellers/login`,
        registerData
      );

      await auth.login();
      navigate("/");
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
            <div className="signup-login__form-button">
              <Button type="submit">LOGIN</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
