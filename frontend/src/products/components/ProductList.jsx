import React from "react";
import ProductCard from "./ProductCard";

import "./ProductList.css";
import { Link } from "react-router-dom";

const ProductList = (props) => {
  return (
    <div className="center">
      <ul className="product-list-box">
        {props.items.map((item) => (
          <li key={item.id}>
            <Link to={`/product/${item.id}`}>
              <ProductCard item={item} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
