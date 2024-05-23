import React, { useContext, useRef, useState } from "react";
import axios from "axios";

import DefaultImage from "../../assets/image.png";

import "./AddCourse.css";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const auth = useContext(AuthContext);
  const filePickerRef = useRef();

  const [formContent, setFormContent] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const navigate = useNavigate();

  const courseSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formContent.title);
      formData.append("description", formContent.description);
      formData.append("price", formContent.price);
      formData.append("category", formContent.category);
      formData.append("image", formContent.image);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/courses/new`,
        formData
      );

      console.log(response);

      navigate("/seller/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="center">
      <main className="add-course-box">
        <form onSubmit={courseSubmitHandler}>
          <div className="course-image-upload-box">
            <div
              className="course-image-upload-box__image"
              onClick={pickImageHandler}
            >
              {formContent.image ? (
                <img
                  src={URL.createObjectURL(formContent.image)}
                  alt="Unable to show image"
                />
              ) : (
                <img src={DefaultImage} alt="Select Image" />
              )}
              <input
                type="file"
                ref={filePickerRef}
                onChange={(e) => inputHandler("image", e.target.files[0])}
              />
            </div>
            <Button
              element="text"
              type="button"
              width="10rem"
              onClick={pickImageHandler}
            >
              {formContent.image ? "Change Image" : "Select Image"}
            </Button>
          </div>
          <div className="course-info-box">
            <Input
              element="input"
              id="title"
              type="text"
              label="Title"
              placeholder="Course Name"
              onInput={inputHandler}
            />
            <Input
              element="textarea"
              id="description"
              type="text"
              label="Description"
              onInput={inputHandler}
            />
            <div className="form-element-row">
              <Input
                element="input"
                id="price"
                type="number"
                label="Price (BDT)"
                onInput={inputHandler}
                width="45%"
              />
              <Input
                element="select"
                id="category"
                type="select"
                label="Category"
                options={["Programming", "Design", "Marketing"]}
                onInput={inputHandler}
                width="45%"
              />
            </div>
          </div>

          <div className="course-submit-button">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddCourse;
