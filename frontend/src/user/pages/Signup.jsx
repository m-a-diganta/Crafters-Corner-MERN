import React, { useRef, useState } from "react";
import defaultUserImage from "../../assets/user.svg";

import { Link } from "react-router-dom";

import "./Auth.css";
import Input from "../../shared/components/FormElements/Input";

const Signup = () => {
  const filePickerRef = useRef();
  const [formContent, setFormContent] = useState({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
    type: "customer",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const signupSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formContent);
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
              <div className="form-image center" onClick={pickImageHandler}>
                {formContent.imageUrl ? (
                  <img
                    src={URL.createObjectURL(formContent.imageUrl)}
                    alt="Pick an Image"
                  />
                ) : (
                  <img src={defaultUserImage} alt="Pick an Image" />
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
                  onChange={(e) => inputHandler("type", e.target.value)}
                  checked={formContent.type === "customer"}
                />
                <label htmlFor="customer">Customer</label>
                <input
                  type="radio"
                  id="seller"
                  name="type"
                  value="seller"
                  onChange={(e) => inputHandler("type", e.target.value)}
                  checked={formContent.type === "seller"}
                />
                <label htmlFor="seller">Seller</label>
              </div>
            </div>

            <button className="submit-button" type="submit">
              SIGNUP
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
