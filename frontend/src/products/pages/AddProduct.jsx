import React, { useContext, useRef, useState } from "react";

import DefaultImage from "../../assets/image.png";

import "./AddProduct.css";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";

const AddProduct = () => {
  const auth = useContext(AuthContext);
  const filePickerRef = useRef();

  const [formContent, setFormContent] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    stock: "",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="center">
      <main className="add-product-box">
        <div className="product-image-upload-box">
          <div
            className="product-image-upload-box__image"
            onClick={pickImageHandler}
          >
            {formContent.imageUrl ? (
              <img
                src={URL.createObjectURL(formContent.imageUrl)}
                alt="Unable to show image"
              />
            ) : (
              <img src={DefaultImage} alt="Pick an Image" />
            )}
            <input
              type="file"
              ref={filePickerRef}
              onChange={(e) => inputHandler("imageUrl", e.target.files[0])}
            />
          </div>
          <Button
            element="text"
            type="button"
            width="10rem"
            onClick={pickImageHandler}
          >
            {formContent.imageUrl ? "Change Image" : "Pick an Image"}
          </Button>
        </div>
        <div className="product-info-box">
          <Input
            element="input"
            id="title"
            type="text"
            label="Title"
            placeholder="Product Name"
            onInput={inputHandler}
          />
          <Input
            element="textarea"
            id="description"
            type="text"
            label="Description"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="price"
            type="number"
            label="Price (BDT)"
            onInput={inputHandler}
          />
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
