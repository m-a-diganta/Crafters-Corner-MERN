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

  return <>{loadedProducts && <ProductList items={loadedProducts} />}</>;
};

export default SellerProducts;
