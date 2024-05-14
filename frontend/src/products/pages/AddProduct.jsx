import React, { useContext, useRef, useState } from "react";
import axios from "axios";

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

  const productSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formContent.title);
      formData.append("description", formContent.description);
      formData.append("price", formContent.price);
      formData.append("category", formContent.category);
      formData.append("image", formContent.imageUrl);
      formData.append("stock", formContent.stock);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/new`,
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
      <main className="add-product-box">
        <form onSubmit={productSubmitHandler}>
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
            <div className="form-element-row">
              <Input
                element="input"
                id="stock"
                type="number"
                label="Stock"
                onInput={inputHandler}
                width="45%"
              />
              <Input
                element="select"
                id="category"
                type="select"
                label="Category"
                options={["Clothing", "Accessories", "Category3"]}
                onInput={inputHandler}
                width="45%"
              />
            </div>
          </div>

          <div className="product-submit-button">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
