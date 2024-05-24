import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../../shared/context/auth-context";
import ProductList from "../components/ProductList";

const SellerProducts = () => {
  const auth = useContext(AuthContext);
  const [loadedProducts, setLoadedProducts] = useState();

  const fetchProducts = async () => {
    try {
      const responseData = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/products/sellerproducts/${auth.userId}`
      );

      setLoadedProducts(responseData.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <div className="page_container">
    <div className="seller-product-page_box">
    <h1 className="product-headline">Products: {auth.username}</h1>
    <div className="h-line"></div>
    <div className="product_container">
      {loadedProducts && <ProductList items={loadedProducts} />}
    </div>
  </div>
</div>;
};

export default SellerProducts;
