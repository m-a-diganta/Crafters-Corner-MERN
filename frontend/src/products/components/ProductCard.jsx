import React from "react";

import "./ProductCard.css";

const ProductCard = (props) => {
  return (
    <main className="product-card-box">
      <div className="product-card-image">
        <img
          src={`${import.meta.env.VITE_REACT_APP_ASSET_URL}/${
            props.item.image
          }`}
          alt=""
        />
      </div>
      <div className="product-card-info">
        <h4>{props.item.title}</h4>
        <h5>{props.item.price} BDT</h5>
      </div>
      {props.item.stock ? (
        <button type="button">ADD TO CART</button>
      ) : (
        <button disabled type="button">
          ADD TO CART
        </button>
      )}
    </main>
  );
};

export default ProductCard;
