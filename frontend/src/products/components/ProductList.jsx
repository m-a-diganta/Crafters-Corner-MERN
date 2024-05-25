import React from "react";
import ProductCard from "./ProductCard";

import "./ProductList.css";
import { Link } from "react-router-dom";

const ProductList = (props) => {
  return (
    
      <ul className="product-list__box">
        {props.items.map((item) => (
          <li key={item.id}>
            <Link to={`/product/${item.id}`}>
              <ProductCard item={item} />
            </Link>
          </li>
        ))}
      </ul>
    
  );
};

export default ProductList;
