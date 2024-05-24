import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import axios from "axios";

import "./ProductItem.css";

const ProductItem = () => {
  const auth = useContext(AuthContext);
  const [loadedProduct, setLoadedProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const pid = useParams().pid;

  const fetchProduct = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/${pid}`
      );

      setLoadedProduct(responseData.data.product);
    } catch (err) {
      console.error(err);
    }
  };

  const quantityChangeHandler = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 0 && newQuantity <= loadedProduct.stock) {
      setQuantity(newQuantity);
    }
  };

  const quantityDecreaseHandler = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const quantityIncreaseHandler = () => {
    if (loadedProduct.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const navigate = useNavigate();

  const productDeleteHandler = async () => {
    try {
      const responseData = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/${pid}`
      );

      navigate(-1);
    } catch (err) {
      console.error(err);
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
              <div className="product-info-column">
                <h1>{loadedProduct.title}</h1>
                <h3>{loadedProduct.price} /- BDT</h3>
                {loadedProduct.stock ? (
                  <div className="quantity-box">
                    <h4 className="green">
                      In Stock <p>({loadedProduct.stock})</p>
                    </h4>
                    <div className="quantity-change-box">
                      <button type="button" onClick={quantityDecreaseHandler}>
                        {"<"}
                      </button>
                      <input
                        id="quantity"
                        type="number"
                        onChange={quantityChangeHandler}
                        value={quantity}
                      />
                      <button type="button" onClick={quantityIncreaseHandler}>
                        {">"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <h4 className="red">Stock Out</h4>
                )}
                <div className="product-info-column__buttons">
                  {auth.userId === loadedProduct.seller && (
                    <>
                      <Link
                        to={`/seller/product/${loadedProduct.id}/edit`}
                        className="edit-button"
                      >
                        EDIT
                      </Link>
                      <button type="button" className="delete-button" onClick={productDeleteHandler}>
                        DELETE
                      </button>
                    </>
                  )}
                  {auth.role === "customer" && (
                    <button disabled={!loadedProduct.stock} type="button">
                      ADD TO CART
                    </button>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default ProductItem;
