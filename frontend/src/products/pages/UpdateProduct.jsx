import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../shared/context/auth-context";
import Input from "../../shared/components/FormElements/Input";

import "./UpdateProduct.css";

const UpdateProduct = () => {
  const auth = useContext(AuthContext);
  const [loadedProduct, setLoadedProduct] = useState();
  const pid = useParams().pid;

  const [formContent, setFormContent] = useState({
    price: "",
    stock: "",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const fetchProduct = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/${pid}`
      );

      setLoadedProduct(responseData.data.product);
      setFormContent({
        price: responseData.data.product.price,
        stock: responseData.data.product.stock,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const quantityChangeHandler = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 0 && newQuantity <= 100) {
      setFormContent({ ...formContent, stock: newQuantity });
    }
  };

  const quantityDecreaseHandler = () => {
    if (formContent.stock > 0) {
      setFormContent({ ...formContent, stock: formContent.stock - 1 });
    }
  };

  const quantityIncreaseHandler = () => {
    if (101 > formContent.stock) {
      setFormContent({ ...formContent, stock: formContent.stock + 1 });
    }
  };

  const navigate = useNavigate();

  const productUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { price, stock } = formContent;
      const updatedData = { price, stock };

      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/${pid}`,
        updatedData
      );
      navigate(`/product/${pid}`, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loadedProduct && (
        <div className="center">
          <main className="product-item-box">
            <div className="product-image-description-column">
              <div className="product-image-container">
                <div className="product-image-box">
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_ASSET_URL}/${
                      loadedProduct.image
                    }`}
                    alt="No image found"
                  />
                </div>
              </div>
              <div className="product-description-box">
                <h5>Description</h5>
                <p>{loadedProduct.description}</p>
              </div>
            </div>
            <div className="product-info-container">
              <form onSubmit={productUpdateSubmitHandler}>
                <div className="product-info-column">
                  <h1>{loadedProduct.title}</h1>
                  <div className="price-edit-box">
                    <div className="price-edit-input">
                      <Input
                        element="input"
                        id="price"
                        type="number"
                        onInput={inputHandler}
                        defaultValue={formContent.price}
                      />
                    </div>
                    <h3>/- BDT</h3>
                  </div>
                  <div className="quantity-box">
                    {loadedProduct.stock ? (
                      <h4 className="green">
                        In Stock <p>({loadedProduct.stock})</p>
                      </h4>
                    ) : (
                      <h4 className="red">Stock Out</h4>
                    )}

                    <div className="quantity-change-box">
                      <button type="button" onClick={quantityDecreaseHandler}>
                        {"<"}
                      </button>
                      <input
                        id="quantity"
                        type="number"
                        onChange={quantityChangeHandler}
                        value={formContent.stock}
                      />
                      <button type="button" onClick={quantityIncreaseHandler}>
                        {">"}
                      </button>
                    </div>
                  </div>

                  <div className="product-info-column__buttons">
                    {auth.userId === loadedProduct.seller && (
                      <>
                        <button type="submit">UPDATE</button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
