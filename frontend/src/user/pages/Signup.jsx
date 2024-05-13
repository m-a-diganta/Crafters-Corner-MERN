import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";

import defaultUserImage from "../../assets/user.svg";
import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";
import Avatar from "../../shared/components/UIElements/Avatar";
import Button from "../../shared/components/FormElements/Button";

const Signup = () => {
  const auth = useContext(AuthContext);

  const filePickerRef = useRef();
  const [formContent, setFormContent] = useState({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
    role: "customer",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const navigate = useNavigate();

  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formContent.username);
      formData.append("email", formContent.email);
      formData.append("password", formContent.password);
      formData.append("image", formContent.imageUrl);
      formData.append("role", formContent.role);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${
          formContent.role
        }s/signup`,
        formData
      );

      console.log(response);

      await auth.login();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <main className="center">
      <div className="auth-box signup">
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
            <div className="form-image-content">
              <div className="form-image" onClick={pickImageHandler}>
                {formContent.imageUrl ? (
                  <Avatar
                    image={URL.createObjectURL(formContent.imageUrl)}
                    alt="Pick an Image"
                  />
                ) : (
                  <Avatar image={defaultUserImage} alt="Pick an Image" />
                )}

                <input
                  type="file"
                  ref={filePickerRef}
                  onChange={(e) => inputHandler("imageUrl", e.target.files[0])}
                />
              </div>
              <button type="button" onClick={pickImageHandler}>
                {formContent.imageUrl ? "Change Image" : "Pick an Image"}
              </button>
            </div>
            <Input
              element="input"
              id="username"
              type="text"
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

            <div className="toggler">
              <label className="message" htmlFor="">
                I am a
              </label>
              <div className="radio-selector">
                <input
                  type="radio"
                  id="customer"
                  name="type"
                  value="customer"
                  onChange={(e) => inputHandler("role", e.target.value)}
                  checked={formContent.role === "customer"}
                />
                <label htmlFor="customer">Customer</label>
                <input
                  type="radio"
                  id="seller"
                  name="type"
                  value="seller"
                  onChange={(e) => inputHandler("role", e.target.value)}
                  checked={formContent.role === "seller"}
                />
                <label htmlFor="seller">Seller</label>
              </div>
            </div>

            <div className="signup-login__form-button">
              <Button type="submit">SIGNUP</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
